/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { eventWithTime } from '@rrweb/types';
import * as rrweb from 'rrweb';
import { getUtmMarks } from './utils';

const events: eventWithTime[] = [];
let isSessionClosed = false;
let isSessionFetching = false;

/*
Отправлять данные:
1. При закрытии вкладки и смене страницы
2. При количестве ивентов более 3000
3. При истечении таймера в 1 минуту
*/

export const startRecording = (eventsLength = 500, title = document.title) => {
  if (!window) return;
  document.addEventListener('unload', () => {
    // keep alive?
    postData(title);
  });
  const stop = rrweb.record({
    emit(e) {
      if (events.length <= eventsLength) {
        events.push(e);
        console.log(events);
      }
      if (events.length === eventsLength) {
        stop!();
        postData(title);
      }
    },
  });

  const stopRecording = () => {
    postData(title);
  };

  return stopRecording;
};

export function postData(title = document.title) {
  console.log(title);
  if (isSessionClosed || isSessionFetching) return;
  if (!events?.length) return;
  isSessionFetching = true;
  // https://uba-tool-api.ru
  fetch('https://uba-tool-api.ru/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      utm: getUtmMarks(),
      events,
      pageTitle: title,
    }),
  })
    .then(() => {
      isSessionClosed = true;
      console.log('events pushed successfully');
    })
    .catch((err) => {
      console.log('events not pushed via error: ', err);
    })
    .finally(() => {
      isSessionFetching = false;
    });
}

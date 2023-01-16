/* eslint-disable no-use-before-define */
import { eventWithTime } from '@rrweb/types';
import * as rrweb from 'rrweb';
import { getUtmMarks } from './utils';

const events: eventWithTime[] = [];
let isSessionClosed = false;
let isSessionFetching = false;

/*
Отправлять данные:
1. При закрытии вкладки
2. При количестве ивентов более 3000
3. При истечении таймера в 1 минуту
*/

export const startRecording = () => {
  if (!window) return;
  document.addEventListener('unload', () => {
    // keep alive?
    postData();
  });
  const stop = rrweb.record({
    emit(e) {
      if (events.length <= 500) {
        events.push(e);
      }
      if (events.length === 500) {
        stop!();
        postData();
      }
    },
  });
};

function postData() {
  if (isSessionClosed || isSessionFetching) return;
  isSessionFetching = true;
  fetch('http://127.0.0.1:8080/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      utm: getUtmMarks(),
      events,
    }),
  })
    .then(() => {
      isSessionClosed = true;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isSessionFetching = false;
    });
}

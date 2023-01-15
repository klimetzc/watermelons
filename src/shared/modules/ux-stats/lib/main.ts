/* eslint-disable no-use-before-define */
import { eventWithTime } from '@rrweb/types';
import * as rrweb from 'rrweb';
import { getUtmMarks } from './utils';

const events: eventWithTime[] = [];
let isSessionClosed = false;
let isSessionFetching = false;
// let logInterval: NodeJS.Timer | null = null;

/*
Отправлять данные:
1. При закрытии вкладки
2. При количестве ивентов более 3000
3. При истечении таймера в 1 минуту
*/

export const startRecording = () => {
  if (!window) return;
  document.addEventListener('unload', () => {
    // stop recording, keep alive
    postData();
  });
  const stop = rrweb.record({
    emit(e) {
      if (events.length < 300) {
        events.push(e);
      }
      if (events.length === 300) {
        stop!();
        postData();
      }
    },
  });
};

const postData = () => {
  if (isSessionClosed || isSessionFetching) return;
  isSessionFetching = true;
  console.log('utm: ', getUtmMarks());
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    keepalive: true,
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
  })
    .then(() => {
      console.log('Posted');
      isSessionClosed = true;
    })
    .finally(() => {
      isSessionFetching = false;
    });
};

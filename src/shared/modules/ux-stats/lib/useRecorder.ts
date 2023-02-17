import { useEffect, useState } from 'react';
import { postData, startRecording } from './main';

const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);
  const listenToPopstate = () => {
    const windowPath = window.location.pathname;
    setPath(windowPath);
  };
  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);

    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, []);

  return path;
};

export const useRecorder = (eventsLength = 500, title = document.title) => {
  const path = usePath();

  const stopRecording = () => {
    postData(title);
  };

  useEffect(() => {
    startRecording(eventsLength, title);
  }, []);

  useEffect(() => {
    // stopRecording()
  }, [path]);

  return startRecording;
};

// useRecorder()

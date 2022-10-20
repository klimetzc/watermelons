function trottleWithLastCallback(
  callback: (...args: any[]) => void,
  delay: number
) {
  let isWaiting = false;
  let savedArgs: any[];
  return function wrapper(this: any, ...args: any[]) {
    if (isWaiting === true) {
      savedArgs = args;
      return;
    }
    isWaiting = true;
    callback.apply(this, args);
    setTimeout(() => {
      isWaiting = false;
      wrapper.apply(this, savedArgs);
      savedArgs = [];
    }, delay);
  };
}

function trottle(callback: (...args: any[]) => void, delay: number) {
  let isWaiting = false;
  return function wrapper(this: any, ...args: any[]) {
    if (isWaiting === true) {
      return;
    }

    isWaiting = true;
    callback.apply(this, args);
    setTimeout(() => {
      isWaiting = false;
    }, delay);
  };
}

export { trottle, trottleWithLastCallback };

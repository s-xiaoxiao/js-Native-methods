function Sleep(fn: Function, delay: number) {
  setTimeout(() => fn(), delay);
}


function SleepPromise(delay: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), delay);
  });
}
export function debounce(callback, delay = 100) {
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}

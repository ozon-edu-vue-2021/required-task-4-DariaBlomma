export function throttle(f, t) {
  const calls = {};

  return function (args) {
    const previousCall = calls.lastCall;

    if (previousCall === undefined || Date.now() - previousCall > t) {
      calls.lastCall = Date.now();
      f(args);
    }
  };
}

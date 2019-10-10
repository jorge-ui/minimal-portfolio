export function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

export function checkMobile() {
  return window.innerWidth < 576;
}

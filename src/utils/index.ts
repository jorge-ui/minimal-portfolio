export function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export const getHashPath = (url: string = window.location.hash): string =>
    (url[0] === '#' ? url.substr(1) :
            (url.includes('#') ? (url.split('#')[1] || '') : url)
    ).split('?')[0] || '/';

export function checkIsMobile(): boolean {
    return window.innerWidth <= 575;
}
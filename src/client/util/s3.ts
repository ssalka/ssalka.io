const s3BaseURL = 'https://s3.amazonaws.com/ssalka.io';

export function getResourceURL(path: string): string {
  return `${s3BaseURL}/${path}`;
}

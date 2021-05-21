// CORS enabled version of the xkcd API. Credit goes to https://github.com/khalby786/getxkcd
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const BASE_URL = process.env.REACT_APP_XKCD_API!;

export const randomComicURL = (maxNum: number) => {
  const comicNum = Math.floor(Math.random() * (maxNum + 1));
  return `${BASE_URL}/?num=${comicNum}`;
};

import { RatingSetup } from './const';

const numberItemsText = (count: number, text: string): string =>
  `${count} ${text}${count > 1 ? 's' : ''}`;
const capitalLetterText = (text: string): string =>
  text[0].toUpperCase() + text.slice(1);

const getRandomArrayElement = <T>(arr: T[] | readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRatingInPercents = (value: number) =>
  (Math.round(value) * 100) / RatingSetup.MaxRating;

export {
  numberItemsText,
  capitalLetterText,
  getRandomArrayElement,
  getRatingInPercents,
};

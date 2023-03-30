import { YEAR, MONTH, DATE } from './types';

export function yearData(year) {
  return {
    type: YEAR,
    payload: year,
  };
}
export function monthData(month) {
  return {
    type: MONTH,
    payload: month,
  };
}
export async function dateData(date) {
  return {
    type: DATE,
    payload: date,
  };
}

import { YEAR, MONTH, DATE } from '../actions/types';
export default function date_reducer(
  state = {
    year: ['default'],
    month: ['default'],
    date: '',
  },
  action
) {
  switch (action.type) {
    case YEAR:
      return { ...state, year: action.payload };
    case MONTH:
      return { ...state, month: action.payload };
    case DATE:
      return { ...state, date: action.payload };
    default:
      return state;
  }
}

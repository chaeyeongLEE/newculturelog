import { MOVIE, BOOK, PERFORMANCE } from '../actions/types';
export default function movieAPI(
  state = {
    movieinfo: ['default'],
    bookinfo: ['default'],
    perfoinfo: ['default'],
  },
  action
) {
  // console.log('reducer', action);
  switch (action.type) {
    case MOVIE:
      return { ...state, movieinfo: action.payload };
    case BOOK:
      return { ...state, bookinfo: action.payload };
    case PERFORMANCE:
      return { ...state, perfoinfo: action.payload };
    default:
      return state;
  }
}

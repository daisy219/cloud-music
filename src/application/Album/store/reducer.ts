import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  currentAlbum: {},
  enterLoading: true,
});
export default (state = defaultState, action: any) => {
  switch(action.type) {
    case actionTypes.CHANGE_ALBUM_DETAIL:
      return state.set('currentAlbum', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
}

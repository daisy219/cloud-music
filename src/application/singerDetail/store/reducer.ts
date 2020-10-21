import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  currentDetail: {},
  enterLoading: true,
});

export default (state = defaultState, action: any) => {
  switch(action.type) {
    case actionTypes.CHAGNE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case actionTypes.CHAGNE_CURRENT_DETAIL:
      return state.set('currentDetail', action.data);
    default:
      return state;
  }
}
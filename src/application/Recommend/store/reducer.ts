import * as actionTypes from './constants';

import { fromJS } from 'immutable'; // 这里用到fromJS把JS数据结构转化成immutable数据结构

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
});

export default (state = defaultState, action: any) => {
  switch(action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommentList', action.data);
    default:
      return state;
  }
}
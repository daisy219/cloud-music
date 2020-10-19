import { fromJS } from 'immutable';
import { getRankListRequest } from '@/api/request';

// constants
export const CHANGE_RANK_LIST = 'home/rank/CHAGNE_RANK_LIST';
export const CHAGNE_LOADING = 'home/rank/CHAGE_LOADING';

// actionCreator
const changeRankList = (data: any) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data)
});

const changeLoading = (data: any) => ({
  type: CHAGNE_LOADING,
  data
})

export const getRankList = () => {
  return async (dispatch: any) => {
    const data = await getRankListRequest();
    let list = data && data.data.result;
    dispatch(changeRankList(list));
    dispatch(changeLoading(false));
  }
}

// reducer
const defaultState = fromJS({
  rankList: [],
  loading: true
})

const reducer = (state = defaultState, action: any) => {
  switch(action.type) {
    case CHANGE_RANK_LIST:
      return state.set('rankList', action.data);
    case CHAGNE_LOADING: 
      return state.set('loading', action.data);
    default:
     return state;
  }
}
export { reducer }
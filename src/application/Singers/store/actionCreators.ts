import {
  getHotSingerListRequest,
  getSingerListRequest
} from '@/api/request';
import {
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT,
  CHANGE_ENTER_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING
} from './constants';
import { fromJS } from 'immutable';
import { waitTime } from '@/utils/index';

const changeSingerList = (data: any[]) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
});

export const changePageCount = (data: number) => ({
  type: CHANGE_PAGE_COUNT,
  data
});

export const changeEnterLoading = (data: boolean) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

export const changePullUpLoading = (data: boolean) => ({
  type: CHANGE_PULLUP_LOADING,
  data
})

export const changePullDownLoading = (data: boolean) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
});

// 第一次加载热门歌手
export const getHotSingerList = () => {
  return async (dispatch: any) => {
    try {
      await waitTime(1000);
      const res = await getHotSingerListRequest(0);
      const data = res.data.result;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    } catch (err) {
      console.log(err);
    }
  }
}

export const refreshMoreHotSingerList = () => {
  return async (dispatch: any, getState: Function) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    try {
      await waitTime(1000);
      const res = await getHotSingerListRequest(pageCount);
      const data = [...singerList, ...res.data.result];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    } catch (err) {
      console.log(err);
    }
  }
}

// 第一次加载对应类别的歌手
export const getSingerList = (category: string, alpha: string) => {
  return async (dispatch: any, getState: Function) => {
    try {
      await waitTime(1000);
      const res = await getSingerListRequest(category, alpha, 0);
      const data = res.data.result;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    } catch (err) {
      console.log(err);
    }
  }
}

// 加载更多歌手
export const refreshMoreSingerList = (category: string, alpha: string) => {
  return async (dispatch: any, getState: Function) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singer', 'singerList']).toJS();
    try {
      await waitTime(1000);
      const res = await getSingerListRequest(category, alpha, pageCount);
      const data = [...singerList, ...res.data.result];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    } catch(err) {
      console.log(err);
    }
  }
}

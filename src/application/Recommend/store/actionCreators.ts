import * as actionTypes from './constants';
import { fromJS } from 'immutable'; // 将JS对象转换成immutable对象
import { getBannerRequest, getRecommendListRequest } from '@/api/request';
import { waitTime } from '@/utils/index';

export const changeBannerList = (data: any) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});
export const changeRecommendList = (data: any) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
});
export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
});

export const getBannerList = () => {
  return (dispatch: any) => {
    getBannerRequest().then(async (data: any) => {
      await waitTime(1000);
      dispatch(changeBannerList(data.data.result));
    }).catch(() => {
      console.log('轮播图数据传输错误');
    })
  }
}

export const getRecommendList = () => {
  return (dispatch: any) => {
    getRecommendListRequest().then(async (data: any) => {
      await waitTime(1000);
      dispatch(changeRecommendList(data.data.result));
      dispatch(changeEnterLoading(false));
    }).catch(() => {
      console.log('推荐歌单数据传输错误');
    })
  }
}
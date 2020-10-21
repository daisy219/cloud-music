import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getSingerDetailRequest } from  '@/api/request';
import { waitTime } from '@/utils/index';

export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHAGNE_ENTER_LOADING,
  data,
});

export const changeSingerDetail = (data: any) => ({
  type: actionTypes.CHAGNE_CURRENT_DETAIL,
  data: fromJS(data),
});

export const getSingerDetail = () => {
  return async (dispatch: any) => {
    try {
      const res = await getSingerDetailRequest();
      await waitTime(1000);
      dispatch(changeSingerDetail(res.data.result));
      dispatch(changeEnterLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(changeEnterLoading(false));
    }
  }
}
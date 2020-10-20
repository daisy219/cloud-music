import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getAlbumDetailRequest } from '@/api/request';
import { waitTime } from '@/utils/index';

export const changeAlbumDetail = (data: any) => ({
  type: actionTypes.CHANGE_ALBUM_DETAIL,
  data: fromJS(data)
});

export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
});

export const getAlbumDetail = () => {
  return async (dispatch: any) => {
    try {
      const res = await getAlbumDetailRequest();
      await waitTime(1000);
      dispatch(changeAlbumDetail(res.data));
      dispatch(changeEnterLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(changeEnterLoading(false));
    }
  }
}
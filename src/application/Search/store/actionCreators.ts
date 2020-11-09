import {
  SET_ENTER_LOADING,
  SET_HOT_KEYWORDS,
  SET_RESULT_SONGS_LIST,
  SET_SUGGEST_LIST
 } from './constants';
 import { fromJS } from 'immutable';
import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest
} from '@/api/request';

const changeHotKeyWords = (data: any) => ({
  type: SET_HOT_KEYWORDS,
  data: fromJS(data),
})

const changeSuggestList = (data: any) => ({
  type: SET_SUGGEST_LIST,
  data: fromJS(data),
})

const changeResultSongs = (data: any) => ({
  type: SET_RESULT_SONGS_LIST,
  data: fromJS(data)
})
export const changeEnterLoading = (data: any) => ({
  type: SET_ENTER_LOADING,
  data,
})

export const getHotKeyWords = () => {
  return (dispatch: any) => {
    getHotKeyWordsRequest().then((data: any) => {
      let list = ((data || {}).result || {}).hots;
      dispatch(changeHotKeyWords(list));
    })
  }
};
export const getSuggestList = (query: any) => {
  return (dispatch: any) => {
    getSuggestListRequest(query).then((data: any) => {
      if (!data) return;
      let res = ((data || {}).result || {}) || [];
      dispatch(changeSuggestList(res));
    });
    getResultSongsListRequest(query).then((data: any) => {
      if (!data) return;
      let res = data.result.songs || [];
      dispatch(changeResultSongs(res));
      dispatch(changeEnterLoading(false));
    })
  }
}
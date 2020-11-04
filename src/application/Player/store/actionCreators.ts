import {
  SET_CURRENT_SONG,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_SEQUECE_PLAYLIST,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_CURRENT_INDEX,
  SET_SHOW_PLAYLIST,
} from './constants';
import { fromJS } from 'immutable';
import { getPlayListRequest } from '@/api/request';
import { waitTime } from '@/utils/index';

export const changeCurrentSong = (data: any) => ({
  type: SET_CURRENT_SONG,
  data: fromJS(data),
});

export const changeFullScreen = (data: any) => ({
  type: SET_FULL_SCREEN,
  data
});

export const changePlayingState = (data: any) => ({
  type: SET_PLAYING_STATE,
  data
});

export const changeSequecePlayList = (data: any) => ({
  type: SET_SEQUECE_PLAYLIST,
  data: fromJS(data),
});

export const changePlayList = (data: any) => ({
  type: SET_PLAYLIST,
  data: fromJS(data)
});

export const changePlayMode = (data: any) => ({
  type: SET_PLAY_MODE,
  data
});

export const changeCurrentIndex = (data: any) => ({
  type: SET_CURRENT_INDEX,
  data
});

export const changeShowPlayList = (data: any) => ({
  type: SET_SHOW_PLAYLIST,
  data
});

export const getPlayList = () => {
  return (dispatch: any) => {
    getPlayListRequest().then(async (data: any) => {
      await waitTime(1000);
      // console.log(data.data.result);
      dispatch(changePlayList(data.data.result));
    }).catch(() => {
    })
  }
}
export const getSequecePlayList = () => {
  return (dispatch: any) => {
    getPlayListRequest().then(async (data: any) => {
      // await waitTime(1000);
      // console.log(data.data.result);
      dispatch(changeSequecePlayList(data.data.result));
    }).catch(() => {
    })
  }
}
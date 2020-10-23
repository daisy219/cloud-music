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
  data
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
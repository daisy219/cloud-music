import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from './store/actionCreators';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';

function Player(props: any) {
  const currentSong = {
    al: { picUrl: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"},
    name: '木偶人',
    ar: [{name: '薛之谦'}]
  }
  return (
    // <MiniPlayer song={currentSong}/>
    <NormalPlayer song={currentSong} />
  )
}

// 映射Redux全局的state到组件props上
const mapStateToProps = (state: any) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList'])
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePlayingDispatch(data: any) {
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data: any) {
      dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data: any) {
      dispatch(changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(index: number) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data: any) {
      dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data: any) {
      dispatch(changePlayMode(data))
    },
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data))
    }
  };
};

// 将ui嘴贱包装成容器嘴贱
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Player));
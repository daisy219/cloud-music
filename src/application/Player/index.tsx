import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen,
  getPlayList
} from './store/actionCreators';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import { getSongUrl } from '@/api/utils';
import { isEmptyObject } from '@/utils/index';
import { fromJS } from 'immutable';

const Player = React.forwardRef((props: any) => {
    const audioRef = useRef() as any;
    const { fullScreen, playing, currentIndex, currentSong: immutableCurrentSong, playList } = props;
    const {
      getPlayListDispatch,
      toggleFullScreenDispatch,
      togglePlayingDispatch,
      changeCurrentIndexDispatch,
      changeCurrentDispatch,
      changePlayListDispatch
    } = props;
    // 目前播放时间
    const [currentTime, setCurrentTime] = useState(0);
    // 歌曲总时长
    const [duration, setDuration] = useState(0);
    // 歌曲播放速度
    let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
    let currentSong = immutableCurrentSong.toJS();
    // const currentSong = {
    //   al: { picUrl: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"},
    //   name: '木偶人',
    //   ar: [{name: '薛之谦'}]
    // }
    useEffect(() => {
      getPlayListDispatch();
      console.log(playList.toJS());
    }, [playList])
    useEffect(() => {
      if (!currentSong) { return; }
      changeCurrentIndexDispatch(0); // currentIndex默认为-1,临时改为0
      let current = playList[0];
      changeCurrentDispatch(current); // 赋值currentSong
      audioRef.current.src = getSongUrl(current.id);
      setTimeout(() => {
        audioRef.current.play();
      });
      togglePlayingDispatch(true); // 播放状态
      setCurrentTime(0); // 从头开始播放
      setDuration((current.dt / 1000) | 0); // 时长
    }, []);
    const clickPlaying = (e: any, state: boolean) => {
      e.stopPropagation();
      togglePlayingDispatch(state);
    }
    return (
      <div>
        {
          isEmptyObject(currentSong) ? null :
          <MiniPlayer
            song={currentSong}
            playing={playing}
            fullScreen={fullScreen}
            toggleFullScreen={toggleFullScreenDispatch}
            clickPlaying={clickPlaying}
          />
        }
        {
          isEmptyObject(currentSong) ? null :
          <NormalPlayer
            song={currentSong}
            fullScreen={fullScreen}
            toggleFullScreen={toggleFullScreenDispatch}
          />
        }
        <audio ref={audioRef}></audio>
      </div>
    )
  }
)

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
    },
    getPlayListDispatch() {
      dispatch(getPlayList())
    }
  };
};

// 将ui嘴贱包装成容器嘴贱
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Player));
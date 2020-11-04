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
  getPlayList,
  getSequecePlayList
} from './store/actionCreators';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import { shuffle, findIndex } from '@/api/utils';
import { isEmptyObject } from '@/utils/index';
// const playList = [
//   {
//     ftype: 0,
//     djId: 0,
//     a: null,
//     cd: '01',
//     crbt: null,
//     no: 1,
//     st: 0,
//     rt: '',
//     cf: '',
//     alia: [
//       '手游《梦幻花园》苏州园林版推广曲'
//     ],
//     rtUrls: [],
//     fee: 0,
//     s_id: 0,
//     copyright: 0,
//     h: {
//       br: 320000,
//       fid: 0,
//       size: 9400365,
//       vd: -45814
//     },
//     mv: 0,
//     al: {
//       id: 84991301,
//       name: '拾梦纪',
//       picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
//       tns: [],
//       pic_str: '109951164627180052',
//       pic: 109951164627180050
//     },
//     name: '拾梦纪',
//     l: {
//       br: 128000,
//       fid: 0,
//       size: 3760173,
//       vd: -41672
//     },
//     rtype: 0,
//     m: {
//       br: 192000,
//       fid: 0,
//       size: 5640237,
//       vd: -43277
//     },
//     cp: 1416668,
//     mark: 0,
//     rtUrl: null,
//     mst: 9,
//     dt: 234947,
//     ar: [
//       {
//         id: 12084589,
//         name: '妖扬',
//         tns: [],
//         alias: []
//       },
//       {
//         id: 12578371,
//         name: '金天',
//         tns: [],
//         alias: []
//       }
//     ],
//     pop: 5,
//     pst: 0,
//     t: 0,
//     v: 3,
//     id: 1416767593,
//     publishTime: 0,
//     rurl: null
//   }
// ];
const Player = React.forwardRef((props: any, ref: any) => {
  const audioRef = useRef() as any;
  const {
    fullScreen,
    playing,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: inmmutablePlayList,
    mode, // 播放模式
    sequencePlayList: immutableSequencePlayList, // 顺序列表
  } = props;
  const {
    getPlayListDispatch,
    getSequecePlayListDispatch,
    toggleFullScreenDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changeModeDispatch, // 改变mode
    changePlayListDispatch // 改变playList
  } = props;
  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);
  // 记录当前的歌曲。以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({} as any);

  useEffect(() => {
    changeCurrentIndexDispatch(0);
  }, [changeCurrentIndexDispatch]);

  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  }
  // 歌曲播放速度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  const currentSong = immutableCurrentSong.toJS();
  const playList = inmmutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();

  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList)
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
    }
    changeModeDispatch(newMode);
  };

  // 获取播放列表
  useEffect(() => {
    getPlayListDispatch();
    getSequecePlayListDispatch();
  }, [getPlayListDispatch, getSequecePlayListDispatch])
  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    ) {
      return;
    }
    // changeCurrentIndexDispatch(0); // currentIndex默认为-1,临时改为0
    let current = playList[currentIndex] || {};
    changeCurrentDispatch(current); // 赋值currentSong
    // console.log(current);
    setPreSong(current);
    // audioRef.current.src = getSongUrl(current.id);
    // setTimeout(() => {
    //   playing ? audioRef.current.play() : audioRef.current.pause();
    // });
    togglePlayingDispatch(true); // 播放状态
    setCurrentTime(0); // 从头开始播放
    setDuration((current.dt / 1000) | 0); // 时长
  }, [playing, currentIndex, changeCurrentDispatch, playList, preSong.id, togglePlayingDispatch]);

  const clickPlaying = (e: any, state: boolean) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  }
  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  }

  // 一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    changePlayingState(true);
    // audioRef.current.play();
  }
  const handlePrev = () => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) {
      index = playList.length - 1;
    }
    if (!playing) {
      togglePlayingDispatch(true);
    }
    changeCurrentIndexDispatch(index);
  }

  const handleNext = () => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) { index = 0; }
    if (!playing) {
      togglePlayingDispatch(true);
    }
    changeCurrentIndexDispatch(index);
  }
  return (
    <div>
      {
        isEmptyObject(currentSong) ? null :
        <MiniPlayer
          song={currentSong}
          playing={playing}
          percent={percent} // 进度
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
        />
      }
      {
        isEmptyObject(currentSong) ? null :
        <NormalPlayer
          song={currentSong}
          playing={playing}
          fullScreen={fullScreen}
          duration={duration} // 总时长
          currentTime={currentTime} // 播放时间
          percent={percent} // 进度
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
        />
      }
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
      ></audio>
    </div>
  )
})

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
    },
    getSequecePlayListDispatch() {
      dispatch(getSequecePlayList())
    }
  };
};

// 将ui嘴贱包装成容器嘴贱
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Player));
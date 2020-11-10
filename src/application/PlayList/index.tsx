import React, { useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  changeShowPlayList,
  changeCurrentIndex,
  changePlayMode,
  changePlayList,
  changeSequecePlayList,
  changeCurrentSong,
  changePlayingState,
  deleteSong} from '../Player/store/actionCreators';
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style';
import { CSSTransition } from 'react-transition-group';
import { getName, findIndex, shuffle } from '@/api/utils';
import { playMode } from '@/api/config';
import Scroll from '@/components/scroll/index';
import Confirm from '@/components/confirm/index';
// import { transform } from '@babel/core';


const PlayList = (props: any) => {
  const {
    showPlayList,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutabelPlayList,
    mode,
    sequencePlayList: immutableSequencePlayList
   } = props;
  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    deleteSongDispatch,
    clearDispatch
  } = props;
  const playListRef = useRef() as any;
  const listWrapperRef = useRef() as any;
  const confirmRef = useRef() as any;
  const [isShow, setIsShow] = useState(false);
  // 是否允许滑动事件生效
  const [canTouch, setCanTouch] = useState(true);
  const listContentRef = useRef();

  // touchStart后记录y值
  const [startY, setStartY] = useState(0);
  // touchStart事件是否已经被触发
  const [initialed, setInitialed] = useState(false);
  // 用户下滑的距离
  const [distance, setDistance] = useState(0);
  const currentSong = immutableCurrentSong.toJS();
  const playList = immutabelPlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
  const getCurrentIcon = (item: any) => {
    // 是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe6af;' : '';
    return (
      <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{__html: content}}></i>
    )
  };
  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = '&#xe6ab;';
      text = '顺序播放';
    } else if (mode === playMode.loop) {
      content = '&#xe635;';
      text = '单曲循环';
    } else {
      content = '&#xe6b4;'
      text = '随机播放';
    }
    return (
      <div>
        <i className="iconfont" onClick={(e) => changeMode(e)} dangerouslySetInnerHTML={{__html: content}}></i>
        <span className="text" onClick={(e) => changeMode(e)}>{text}</span>
      </div>
    )
  }
  const changeMode = (e: any) => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList);
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
    }
    changeModeDispatch(newMode);
  }
  const handleChangeSong = (index: number) => {
    changeCurrentIndexDispatch(index);
  }
  const handleDeleteSong = (e: any, item: any) => {
    e.stopPropagation();
    deleteSongDispatch(item);
  }

  const handleClear = () => {
    confirmRef.current.show();
  }
  const handleConfirmClear = () => {
    confirmRef.current.hide();
    clearDispatch();
  }


  // 列表出现动画
  const onEnterCB = useCallback(() => {
    // 让列表显示
    setIsShow(true);
    // 最开始是隐藏在下面
    listWrapperRef.current.style.transform = `translate3d(0, 100%, 0)`;
  }, []);

  const onEnteringCB = useCallback(() => {
    listWrapperRef.current.style['transition'] = 'all 0.3s';
    listWrapperRef.current.style.transform = `translate3d(0, 0, 0)`;
  }, []);

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style['transition'] = 'all 0.3s';
    listWrapperRef.current.style.transform = `translate3d(0, 100%, 0)`;
  }, []);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style.transform = `translate3d(0, 100%, 0)`; 
  }, [])


  // 下滑关闭及反弹效果
  const handleTouchStart = (e: any) => {
    setDistance(0);
    if (!canTouch || initialed) { return; }
    listWrapperRef.current.style['transition'] = '';
    setStartY(e.nativeEvent.touches[0].pageY); // 记录y值
    setInitialed(true);
  };
  const handleTouchMove = (e: any) => {
    if (!canTouch || !initialed) { return; }
    let distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) { return; }
    setDistance(distance); // 记录下滑距离
    listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
  };
  const handleTouchEnd = (e: any) => {
    setInitialed(false);
    if (distance >= 150) {
      // 大于150px则关闭playList
      togglePlayListDispatch(false);
    } else {
      // 否则反弹回去
      listWrapperRef.current.style['transition'] = 'all 0.3s';
      listWrapperRef.current.style.transform = `translate3d(0, 0, 0)`;
    }
  };
  const handleScroll = (pos: any) => {
    // 只有当内容偏移量为0的时候才能下滑关闭PlayList。否则一遍内容在移动，一遍列表在移动，出现bug;
    let state = pos.y === 0;
    setCanTouch(state);
  }

  return (
    <div>
      <CSSTransition
        in={showPlayList}
        timeout={300}
        classNames="list-fade"
        onEnter={onEnterCB}
        onEntering={onEnteringCB}
        onExiting={onExitingCB}
        onExited={onExitedCB}
      >
       <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? {display: 'block'} : {display: 'none'}}
          onClick={() => togglePlayListDispatch(false)}
       >
          <div
            className='list_wrapper'
            ref={listWrapperRef}
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
          <ListHeader>
            <h1 className="title">
              { getPlayMode() }
              <span className="iconfont clear" onClick={handleClear}>&#xe63a;</span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listContentRef}
              onScroll={(pos: any) => handleScroll(pos)}
              bounceTop={false}
            >
              <ListContent>
                {
                  playList.map((item: any, index: number) => {
                    return (
                      <li className="item" key={item.id}>
                        {getCurrentIcon(item)}
                        <span className="text" onClick={(e) => handleChangeSong(index)}>{item.name} - {getName(item.ar)}</span>
                        <span className="like">
                          <i className="iconfont">&#xe6b0;</i>
                        </span>
                        <span className="delete" onClick={(e) => handleDeleteSong(e, item)}>
                          <i className="iconfont">&#xe626;</i>
                        </span>
                      </li>
                    )
                  })
                }
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
      </PlayListWrapper>
      </CSSTransition>
      <Confirm
        ref={confirmRef}
        text={'是否删除全部？'}
        handleConfirm={handleConfirmClear}
      />
    </div>
  )
}
// 映射redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  showPlayList: state.getIn(['player', 'showPlayList']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
  mode: state.getIn(['player', 'mode'])
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePlayListDispatch(data: boolean) {
      dispatch(changeShowPlayList(data));
    },
    // 修改当前歌曲在列表中的index，也就是切歌
    changeCurrentIndexDispatch(data: any) {
      dispatch(changeCurrentIndex(data));
    },
    // 修改当前播放模式
    changeModeDispatch(data: any) {
      dispatch(changePlayMode(data));
    },
    // 修改当前的歌曲列表
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data));
    },
    deleteSongDispatch(data: any) {
      dispatch(deleteSong(data));
    },
    clearDispatch() {
      // 1.清空两个列表
      dispatch(changePlayList([]));
      dispatch(changeSequecePlayList([]));
      // 2.初始currentIndex
      dispatch(changeCurrentIndex(-1));
      // 3.关闭PlayList的显示
      dispatch(changeShowPlayList(false));
      // 4.将当前歌曲置空
      dispatch(changeCurrentSong({}));
      // 5.重置播放状态
      dispatch(changePlayingState(false));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList));
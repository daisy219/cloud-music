import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Container, TopDesc, Menu } from './style';
import { CSSTransition } from 'react-transition-group';
import Header from '@/components/header/index';
import Scroll from '@/components/scroll/index';
import * as actionTypes from './store/actionCreators';
import { connect } from 'react-redux';
import { isEmptyObject } from '@/utils/index';
import style from '@/assets/global-style';
import Loading from '@/components/loading';
import SongsList from '@/application/SongList/index';
import MusicNote from '@/components/music-note/index';

export const HEADER_HEIGHT = 45;


const mapStateToProps = (state: any) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAlbumDetailDispatch() {
      dispatch(actionTypes.changeEnterLoading(true));
      dispatch(actionTypes.getAlbumDetail());
    },
  }
}


const Album: React.FC = (props: any) => {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const headerEl = useRef();
  const musicNoteRef = useRef() as any;
  const musicAnimation = (x: any, y: any) => {
    musicNoteRef.current.startAnimation({ x, y });
  }
  const { currentAlbum, enterLoading } = props;
  const { getAlbumDetailDispatch } = props;
  const currentAlbumJS = currentAlbum.toJS() || {};

  const handleScroll = useCallback((pos: any) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current as any;
    // 划过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2); // 渐变效果
      setTitle(currentAlbumJS.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle('歌单');
      setIsMarquee(false);
    }
  }, [currentAlbumJS.name])
  

  useEffect(() => {
    getAlbumDetailDispatch();
  }, [getAlbumDetailDispatch])

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, [])

  // 顶部信息
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbumJS.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbumJS.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe6aa;</i>
            <span className="count">{Math.floor(currentAlbumJS.subscribedCount / 1000 / 10)}万</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbumJS.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbumJS.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbumJS.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe600;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe629;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe6b1;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe7bc;</i>
          更多
        </div>
      </Menu>
    )
  }


  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
    <Container>
        {enterLoading ? <Loading></Loading> : null}
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
      {
          !isEmptyObject(currentAlbumJS) ? (
            <Scroll bounceTop={false} onScroll={handleScroll}>
              <div>
                { renderTopDesc() }
                { renderMenu() }
                <SongsList 
                  songs={currentAlbumJS.tracks}
                  collectCount={currentAlbumJS.subscribedCount}
                  showCollect={true}
                  musicAnimation={musicAnimation}
                ></SongsList>
                <MusicNote ref={musicNoteRef}></MusicNote>
              </div>
            </Scroll>
          ) : null
      }
    </Container>
    </CSSTransition>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
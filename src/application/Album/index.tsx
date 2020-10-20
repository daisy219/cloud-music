import React, { useEffect, useState, useRef } from 'react';
import { Container, TopDesc, Menu, SongItem, SongList } from './style';
import { CSSTransition } from 'react-transition-group';
import Header from '@/components/header/index';
import Scroll from '@/components/scroll/index';
import * as actionTypes from './store/actionCreators';
import { connect } from 'react-redux';
import { isEmptyObject, getCount } from '@/utils/index';
import { getName } from '@/api/utils';
import style from '@/assets/global-style';

export const HEADER_HEIGHT = 45;


const mapStateTopProps = (state: any) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAlbumDetailDispatch() {
      dispatch(actionTypes.getAlbumDetail());
    },
  }
}


const Album: React.FC = (props: any) => {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const headerEl = useRef();
  
  const { currentAlbum, enterLoading } = props;
  const { getAlbumDetailDispatch } = props;
  const currentAlbumJS = currentAlbum.toJS() || {};

  const handleScroll = (pos: any) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current as any;
    // 划过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbumJS.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle('歌单');
      setIsMarquee(false);
    }
  }

  useEffect(() => {
    getAlbumDetailDispatch();
  }, [getAlbumDetailDispatch])

  const handleBack = () => {
    setShowStatus(false);
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
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
      {
          !isEmptyObject(currentAlbumJS) ? (
            <Scroll bounceTop={false} onScroll={handleScroll}>
              <div>
                <TopDesc background={currentAlbumJS.coverImgUrl}>
                  <div className="background">
                    <div className="filter"></div>
                  </div>
                  <div className="img_wrapper">
                    <div className="decorate"></div>
                    <img src={currentAlbumJS.coverImgUrl} alt=""/>
                    <div className="play_count">
                      <i className="iconfont play">&#xe69f;</i>
                      <span className="count">{Math.floor(currentAlbumJS.subscribedCount/1000/10)}万</span>
                    </div>
                  </div>
                  <div className="desc_wrapper">
                    <div className="title">{currentAlbumJS.name}</div>
                    <div className="person">
                      <div className="avatar">
                        <img src={currentAlbumJS.creator.avatarUrl} alt=""/>
                      </div>
                      <div className="name">{currentAlbumJS.creator.nickname}</div>
                    </div>
                  </div>
                </TopDesc>
                <Menu>
                  <div>
                    <i className="iconfont">&#xe69c;</i>
                    评论
                  </div>
                  <div>
                    <i className="iconfont">&#xe69c;</i>
                    点赞
                  </div>
                  <div>
                    <i className="iconfont">&#xe69c;</i>
                    收藏
                  </div>
                  <div>
                    <i className="iconfont">&#xe69c;</i>
                    更多
                  </div>
                </Menu>
                {/* 歌单列表 */}
                <SongList>
                  <div className="first_line">
                    <div className="play_all">
                      <i className="iconfont">&#xe6e3;</i>
                      <span> 播放全部 <span className="sum">(共 {currentAlbumJS.tracks.length} 首)</span></span>
                    </div>
                    <div className="add_list">
                      <i className="iconfont">&#xe62d;</i>
                      <span> 收藏 ({getCount(currentAlbumJS.subscribedCount)})</span>
                    </div>
                  </div>
                  <SongItem>
                    {
                      currentAlbumJS.tracks.map((item: any, index: number) => {
                        return (
                          <li key={index}>
                            <span className="index">{index + 1}</span>
                            <div className="info">
                              <span>{item.name}</span>
                              <span>
                                {getName(item.ar)} - {item.al.name}
                              </span>
                            </div>
                          </li>
                        )
                      })
                    }
                  </SongItem>
                </SongList>

              </div>

              
            </Scroll>
          ) : null
      }
    </Container>
    </CSSTransition>
  )
}
export default connect(mapStateTopProps, mapDispatchToProps)(React.memo(Album));
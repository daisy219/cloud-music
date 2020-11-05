import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style';
import * as actionTypes from './store/actionCreators';
import { connect } from 'react-redux';
import Header from '@/components/header/index';
import { isEmptyObject } from '@/utils/index';
import Scroll from '@/components/scroll/index';
import SongList from '@/application/SongList';
import { HEADER_HEIGHT } from '@/api/config';
import Loading from '@/components/loading';
import MusicNote from '@/components/music-note/index';

const mapStateToProps = (state: any) => ({
  currentDetail: state.getIn(['singerDetail', 'currentDetail']),
  enterLoading: state.getIn(['singerDetail', 'enterLoading'])
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCurrentDetailDispatch() {
      dispatch(actionTypes.changeEnterLoading(true));
      dispatch(actionTypes.getSingerDetail());
    }
  }
}


const SingerDetail = React.forwardRef((prop: any, refs: any) => {
    const [showStatus, setShowStates] = useState(true);
    const { currentDetail, enterLoading } = prop;
    const { getCurrentDetailDispatch } = prop;
    const artist = currentDetail.toJS() || {};
    const collectButton = useRef() as any;
    const imageWrapper = useRef() as any;
    const songScrollWrapper = useRef() as any;
    const songScroll = useRef() as any;
    const header = useRef() as any;
    const layer = useRef() as any;
    const initialHeight = useRef(0) as any;
    const musicNoteRef = useRef() as any;
    const musicAnimation = (x: any, y: any) => {
      musicNoteRef.current.startAnimation({ x, y });
    }
    const OFFSET = 5;

  const handleScroll = useCallback((pos: any) => {
      let height = initialHeight.current;
      const newY = pos.y;
      const imageDOM = imageWrapper.current;
      const buttonDOM = collectButton.current;
      const headerDOM = header.current;
      const layerDOM = layer.current;
      const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
  
      // 指的是滑动距离占图片高度的百分比
      const percent = Math.abs(newY / height);
      if (newY > 0) {
        imageDOM.style["transform"] = `scale(${1 + percent})`;
        buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
        layerDOM.style.top = `${height - OFFSET + newY}px`;
      } else if (newY >= minScrollY) {
        layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
        // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
        layerDOM.style.zIndex = 1;
        imageDOM.style.paddingTop = "75%";
        imageDOM.style.height = 0;
        imageDOM.style.zIndex = -1;
        // 按钮跟着移动且渐渐变透明
        buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
        buttonDOM.style["opacity"] = `${1 - percent * 2}`;
      } else if (newY < minScrollY) {
        // 往上滑动，但是超过Header部分
        layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
        layerDOM.style.zIndex = 1;
        // 防止溢出的歌单内容遮住Header
        headerDOM.style.zIndex = 100;
        imageDOM.style.height = `${HEADER_HEIGHT}px`;
        imageDOM.style.paddingTop = 0;
        imageDOM.style.zIndex = 99;
      }
  }, [collectButton, header, imageWrapper, initialHeight, layer])
  
    useEffect(() => {
      if (imageWrapper.current && songScrollWrapper.current && layer.current) {
        let h = imageWrapper.current.offsetHeight;
        songScrollWrapper.current.style.top = `${h - OFFSET }px`;
        initialHeight.current = h;
        layer.current.style.top = `${h - OFFSET}px`;
        songScroll.current.refresh();
      }
      // // 把遮罩先放在下面，以裹住歌曲列表
      getCurrentDetailDispatch();
    
   // eslint-disable-next-line 
    }, [imageWrapper.current]);
    const handleBack = useCallback(() => {
      setShowStates(false);
    }, [])
    return (
      <CSSTransition
        in={showStatus}
        timeout={300}
        classNames="fly"
        appear={true}
        unmountOnExit
        onExited={() => prop.history.goBack()}
      >
        <Container play={1}>
          {
            !isEmptyObject(artist) ? (
              <div>
                <Header title={"头部"} handleClick={handleBack} ref={header}></Header>
                <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
                  <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButton}>
                  <i className="iconfont">&#xe6b0;</i>
                  <span className="text">收藏</span>
                </CollectButton>
                <BgLayer ref={layer}></BgLayer>
                <SongListWrapper ref={songScrollWrapper}>
                  <Scroll ref={songScroll} onScroll={handleScroll}>
                    <SongList
                      showCollect={false}
                      songs={artist.hotSongs}
                      musicAnimation={musicAnimation}
                    >
                    </SongList>
                  </Scroll>
                </SongListWrapper>
              </div>
            ) : null
          }
        { enterLoading ? (<Loading></Loading>) : null}
          <MusicNote ref={musicNoteRef}></MusicNote>
        </Container>
      </CSSTransition>
    )
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SingerDetail));
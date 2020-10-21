import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style';
import * as actionTypes from './store/actionCreators';
import { connect } from 'react-redux';
import Header from '@/components/header/index';
import { isEmptyObject } from '@/utils/index';
import Scroll from '@/components/scroll/index';
import SongList from '@/application/SongList';

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

const SingerDetail: React.FC = (prop: any) => {
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

  const OFFSET = 5;

  useEffect(() => {
    // let h = imageWrapper.current.offsetHeight;
    // songScrollWrapper.current.style.top = `${h - OFFSET }px`;
    // initialHeight.current = h;
    // // 把遮罩先放在下面，以裹住歌曲列表
    // layer.current.style.top = `${h - OFFSET}px`;
    // songScroll.current.refresh();
    getCurrentDetailDispatch();
  
 // eslint-disable-next-line 
  }, []);
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
              <Header title={"头部"} handleClick={handleBack}></Header>
              <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
                <div className="filter"></div>
              </ImgWrapper>
              <CollectButton ref={collectButton}>
                <i className="iconfont">&#xe604;</i>
                <span className="text">收藏</span>
              </CollectButton>
              <BgLayer ref={layer}></BgLayer>
              <SongListWrapper ref={songScrollWrapper}>
                <Scroll ref={songScroll}>
                  <SongList
                    showCollect={false}
                    songs={artist.hotSongs}
                  >
                  </SongList>
                </Scroll>
              </SongListWrapper>
            </div>
          ) : null
        }
      </Container>
    </CSSTransition>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SingerDetail));
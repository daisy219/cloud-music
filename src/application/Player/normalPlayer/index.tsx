import React, { useRef } from 'react';
import { getName } from '@/api/utils';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper
} from './style';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';
import { prefixStyle, formatPlayTime } from '@/utils/index';
import ProgressBar from '@/components/progressBar/index';


const NormalPlayer = React.forwardRef((props: any, refs: any) => {
  const { song, fullScreen, playing, percent, duration, currentTime } = props;
  const { toggleFullScreen, clickPlaying, onProgressChange } = props;

  const normalPlayerRef = useRef() as any;
  const cdWrapperRef = useRef() as any;
  const transform = prefixStyle('transform') as string;
  const enter = () => {
    normalPlayerRef.current.style.display = 'block';
    const { x, y, scale } = _getPosAndScale(); // 获取miniPlayer图片中心相对normalPlayer唱片中心的偏移
    let animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale (${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    });
    animations.runAnimation(cdWrapperRef.current, 'move');
  };
  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x, y, scale
    };
  };
  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation('move');
    cdWrapperDom.style.animation = '';
  }

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = 'all 0.4s';
    const { x, y, scale } = _getPosAndScale();
    // 这个暂时不好使
    // cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    cdWrapperDom.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  }

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = '';
    // cdWrapperDom.style[transform] = '';
    cdWrapperDom.style.transform = '';
    // 一定药注意现在要把normalPlayer这个dom给隐藏点，因为CSSTransition的工作只是把动画执行一遍
    // 不置为none现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = 'none';
  }

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img src={song.al.picUrl + "?param=300*300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => { toggleFullScreen(false) }}>
            <i className="iconfont icon-back">&#xe6db;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image play ${playing ? '' : 'pause'}`}
                src={song.al.picUrl + "?param=400*400"}
                alt=""
              />
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={e => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{
                  __html: playing ? "&#xe723;" : "&#xe731;"
                }}
              >

              </i>
            </div>
          </CDWrapper>
        </Middle>
        <ProgressWrapper>
          <span className="time time-l">{formatPlayTime(currentTime)}</span>
          <div className="progress-bar-wrapper">
            <ProgressBar
              percent={percent}
              percentChange={onProgressChange}
            ></ProgressBar>
          </div>
          <div className="time time-r">{formatPlayTime(duration)}</div>
        </ProgressWrapper>
        <Bottom className="bottom">
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe6a4;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe69c;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe69f;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe69e;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe69c;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
})
export default React.memo(NormalPlayer);
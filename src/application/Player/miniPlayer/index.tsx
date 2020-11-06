import React, { useRef } from 'react';
import { getName } from '@/api/utils';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';
import ProgressCircle from '@/components/progress-circle/index';

const MiniPlayer = React.forwardRef((props: any, refs: any) => {
  const { song, fullScreen, playing, percent, togglePlayList } = props;
  const { clickPlaying, toggleFullScreen } = props;

  const handlePlayList = (e: any) => {
    togglePlayList(true);
    e.stopPropagation();
  }

  const miniPlayerRef = useRef() as any;
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex';
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen(true)}>
        <div className="icon">
          <div className="imgWrapper">
            <img className={`${playing ? "play" : 'pause'}`} src={(song.al || {}).picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{ getName(song.ar) }</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {
              playing ?
                <i className="icon-mini iconfont icon-pause" onClick={(e) => clickPlaying(e, false)}>&#xe613;</i>
                :
                <i className="icon-mini iconfont icon-play" onClick={(e) => clickPlaying(e, true)}>&#xe6aa;</i>
            }
          </ProgressCircle>
        </div>
        <div className="control" onClick={handlePlayList}>
          <i className="iconfont">&#xe6ac;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
})

export default React.memo(MiniPlayer);
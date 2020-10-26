import React from 'react';
import { getName } from '@/api/utils';
import { MiniPlayerContainer } from './style';

function MiniPlayer(props: any) {
  const { song } = props;

  const enterPlayer = () => {
    props.history.push('player');
  };
  return (
    <MiniPlayerContainer>
      <div className="icon">
        <div className="imgWrapper" onClick={() => enterPlayer()}>
          <img className="play" src={(song.al || {}).picUrl} width="40" height="40" alt="img" />
        </div>
      </div>
      <div className="text">
        <h2 className="name">{song.name}</h2>
        <p className="desc">{ getName(song.ar) }</p>
      </div>
      <div className="control">
        <i className="iconfont">&#xe69c;</i>
      </div>
      <div className="control">
        <i className="iconfont">&#xe69c;</i>
      </div>
    </MiniPlayerContainer>
  )
}

export default React.memo(MiniPlayer);
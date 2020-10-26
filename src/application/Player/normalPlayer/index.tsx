import React from 'react';
import { getName } from '@/api/utils';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from './style';

function NormalPlayer(props: any) {
  const { song } = props;
  return (
    <NormalPlayerContainer>
      <div className="background">
        <img src={song.al.picUrl + "?param=300*300"}
          width="100%"
          height="100%"
          alt="歌曲图片"
        />
      </div>
      <div className="background layer"></div>
      <Top className="top">
        <div className="back">
          <i className="iconfont icon-back">&#xe6db;</i>
        </div>
        <h1 className="title">{song.name}</h1>
        <h1 className="subtitle">{getName(song.ar)}</h1>
      </Top>
      <Middle>
        <CDWrapper>
          <div className="cd">
            <img
              className="image play"
              src={song.al.picUrl + "?param=400*400"}
              alt=""
             />
          </div>
        </CDWrapper>
      </Middle>
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
  );
}
export default React.memo(NormalPlayer);
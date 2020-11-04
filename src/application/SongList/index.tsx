import React from 'react';
import { SongList, SongItem } from './style';
import { getCount } from '@/utils/index';
import { getName } from '@/api/utils';
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from '@/application/Player/store/actionCreators';
import { connect } from 'react-redux';

// 歌单列表
const SongsList = React.forwardRef((prop: any, refs: any) => {
  const { 
    collectCount,
    showCollect,
    songs,
    changePlayListDispatch,
    changeCurrentIndexDispatch,
    changeSequecePlayListDispatch
   } = prop;
  const { musicAnimation } = prop;
  const totalCount = songs.length;
  const selectItem = (e: any, index: number) => {
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
    // console.log(index);
  }

  let songList = (list: any[]) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push(
        <li key={i} onClick={(e) => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} - {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res;
  }

  const collect = (count: number) => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe6b0;</i>
        <span> 收藏 ({getCount(count)})</span>
      </div>
    )
  }
  

  return (
    <SongList>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6b2;</i>
          <span> 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
        </div>
        {showCollect ? collect(collectCount) : null }
      </div>
      <SongItem>
        {songList(songs)}
      </SongItem>
    </SongList>
  )
});
// 映射dispatch到prop上
const mapDispatchToProps = (dispatch: any) => {
  return {
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data));
    },
    changeCurrentIndexDispatch(data: any) {
      dispatch(changeCurrentIndex(data));
    },
    changeSequecePlayListDispatch(data: any) {
      dispatch(changeSequecePlayList(data));
    }
  }
}

export default connect(null, mapDispatchToProps)(React.memo(SongsList));
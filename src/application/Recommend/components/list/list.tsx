import React from 'react';
import {
  ListWrapper,
  ListItem,
  List
} from './style';
import { getCount } from '@/utils/index';


interface RecommendListStateType extends React.Props<any> {
  recommendList: any;
}
const RecommendList = (props: RecommendListStateType) => {
  // console.log(props);
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          props.recommendList.map((item: any, index: number) => {
            return (
              <ListItem key={item.id}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                  <div className="play_count">
                    <i className="iconfont">&#xe6a5;</i>
                    <span className="count">{ getCount(item.playCount) }</span>
                  </div>
                </div>
                <div className="desc">{ item.name }</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>

  )
}

export default React.memo(RecommendList);
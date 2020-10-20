import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  ListWrapper,
  ListItem,
  List
} from './style';
import { getCount } from '@/utils/index';
import LazyLoad from "react-lazyload";

interface RecommendListStateType{
  recommendList: any;
  history: any;
}
const RecommendList: React.FC<RecommendListStateType> = (props: RecommendListStateType) => {
  // console.log(props);
  const enterDetail = (id: string) => {
    console.log(id);
    props.history.push(`/recommend/${id}`);
  }
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          props.recommendList.map((item: any, index: number) => {
            return (
              <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('@/assets/images/default.jpg')} alt="music" />}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
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

export default React.memo(withRouter(RecommendList as any)) as any;
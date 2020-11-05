import React, { useEffect } from 'react';
import Slider from './components/slider/slider';
import RecommendList from './components/list/list';
import Scroll from '@/components/scroll/index';
import Loading from '@/components/loading/index';
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';
import { renderRoutes } from 'react-router-config';


// import {
//   range_arr
// } from '../../utils/index';
import styled from 'styled-components';
import { forceCheck } from 'react-lazyload';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${(props: any) => props.play > 0 ? '60px' : 0};
  width: 100%;
` as any
interface RecomendListProps extends React.Props<any> {
  route: {
    routes: any
  },
  bannerList: any,
  recommendList: any,
  enterLoading: boolean,
  songsCount: number,
  getBannerDataDispatch: () => void;
  getRecommendListDataDispatch: () => void;
}

const Recommend: React.FC<RecomendListProps> = (props: RecomendListProps) => {
  const { bannerList, recommendList, enterLoading, songsCount } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, [recommendList.size, bannerList.size, getBannerDataDispatch, getRecommendListDataDispatch]);

  const bannerListJS = bannerList ? bannerList.toJS(): [];
  const recommendListJS = recommendList ? recommendList.toJS(): [];
  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null }
      { renderRoutes(props.route.routes as any)}
    </Content>
  )
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  // 不要在这里将数据toJS
  // 不然每次diff对比props的时候都是不一样的引用，还会导致不必要的重渲染，属于滥用immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
  songsCount: state.getIn(['player', 'playList']).size, // 播放列表歌曲数量，以此来判断是否有mini-player
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
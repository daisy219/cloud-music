import React, { useEffect } from 'react';
import Slider from './components/slider/slider';
import RecommendList from './components/list/list';
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';


import {
  range_arr
} from '../../utils/index';
import styled from 'styled-components';
import Scroll from '@/components/scroll/index';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`
interface RecomendListProps extends React.Props<any> {
  bannerList: any,
  recommendList: any,
  getBannerDataDispatch: () => void;
  getRecommendListDataDispatch: () => void;
}

const Recommend = (props: RecomendListProps) => {
  const { bannerList, recommendList } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS(): [];
  const recommendListJS = recommendList ? recommendList.toJS(): [];
  // // mock
  // const bannerList = range_arr(1, 4).map(item => {
  //   return { imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588847094241&di=09653f310edc6469f3207dca22386a8e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbeda8f43d6ac792f00c54073a8bcbd75d40d1e842314-3DXGJO_fw658'};
  // });
  // const recommendList = range_arr(1, 10).map(item =>{
  //   return {
  //     id: item,
  //     picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588846949563&di=773a7c3d6d020f75bd01b82fb1233536&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170304%2F2f1a229a03f04ccb8d401fb79047d496_th.jpg',
  //     playCount: 17171122,
  //     name: '朴树、许巍、李健、郑钧、老狼、赵雷',
  //   }
  // });
  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  // 不要在这里将数据toJS
  // 不然每次diff对比props的时候都是不一样的引用，还会导致不必要的重渲染，属于滥用immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recomment', 'recommendList']),

});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommentList());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
// export default React.memo(Recommend);
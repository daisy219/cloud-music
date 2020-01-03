import React from 'react';
import Slider from './components/slider/slider';
import RecommendList from './components/list/list';
import {
  range_arr
} from '../../utils/index';

const Recommend: React.FC = () => {
  // mock
  const bannerList = range_arr(1, 4).map(item => {
    return {imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg'};
  });
  const recommendList = range_arr(1, 10).map(item =>{
    return {
      id: item,
      picUrl: 'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
      playCount: 17171122,
      name: '朴树、许巍、李健、郑钧、老狼、赵雷',
    }
  });
  return (
    <div>
      <Slider bannerList={bannerList}></Slider>
      <RecommendList recommendList={recommendList}></RecommendList>
    </div>
  )
}

export default React.memo(Recommend);
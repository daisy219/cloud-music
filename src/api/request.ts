import { axiosInstance } from './config';

// 推荐页广告
export const getBannerRequest = () => {
  return axiosInstance.get('/banner.json');
}

// 推荐歌单
export const getRecommendListRequest = () => {
  return axiosInstance.get('/recommend.json');
}

// 歌手列表
export const getHotSingerListRequest = () => {
  return axiosInstance.get(`/artists.json`);
}

// 模拟歌手筛选后列表
export const getSingerListRequest = () => {
  return axiosInstance.get(`/artistsList.json`);
}
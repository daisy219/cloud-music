import { axiosInstance } from './config';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner.json');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/recommend.json');
}
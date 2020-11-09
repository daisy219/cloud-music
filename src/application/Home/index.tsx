import React from 'react';
import { renderRoutes } from 'react-router-config';
import { 
  Top,
  Tab,
  TabItem,
 } from './style';
import { NavLink } from 'react-router-dom'; // 利用 NavLink 组件进行路由跳转
import Player from '../Player';

const Home: React.FC = (props: any) => {
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe6ac;</span>
        <span className="title">music</span>
        <span className="iconfont search" onClick={() => props.history.push('/search')}>&#xe6ae;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      { renderRoutes (route.routes) }
      <Player></Player>
    </div>
  )
}

export default React.memo(Home);
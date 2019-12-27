import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Top } from './style';

const Home: React.FC = (props: any) => {
  const { route } = props;

  return (
    <div>
      <Top>

        <span className="iconfont menu">&#xe69c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe6e1;</span>
        { renderRoutes(route.routes) }
      </Top>
    </div>
  )
}

export default React.memo(Home);
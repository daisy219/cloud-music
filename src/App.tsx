import React from 'react';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { renderRoutes } from 'react-router-config';
import routers from './routes/index';
import {  HashRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <HashRouter>
      <IconStyle />
      <GlobalStyle />
      { renderRoutes(routers) }
    </HashRouter>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { renderRoutes } from 'react-router-config';
import routers from './routes/index';
import {  HashRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <IconStyle />
        <GlobalStyle />
        { renderRoutes(routers) }
      </HashRouter>
    </Provider>
  );
}

export default App;

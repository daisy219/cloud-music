import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '@/application/Recommend/store/index';
import { reducer as singersReducer } from '@/application/Singers/store/index';
import { reducer as rankReducer } from '@/application/Rank/store/index';
import { reducer as albumReducer } from '@/application/Album/store/index';
import { reducer as singerDetailReducer } from '@/application/singerDetail/store/index';
import { reducer as playerReducer, } from '@/application/Player/store/index';

export default combineReducers ({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerDetail: singerDetailReducer,
  player: playerReducer,
});
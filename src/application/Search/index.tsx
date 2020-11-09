import React, { useState, useEffect, useCallback} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, ShortcutWrapper, HotKey } from './style';
import { connect } from 'react-redux';
import SearchBox from '@/components/search-box/index';
import { getHotKeyWords, changeEnterLoading, getSuggestList } from './store/actionCreators';
import Scroll from '@/components/scroll';
import Loading from '@/components/loading/index';
import LazyLoad, {forceCheck} from 'react-lazyload';
import { List, ListItem } from './style';
import { SongItem } from '../SongList/style';
import { getName } from '@/api/utils';

const Search = (props: any) => {
  // 控制动画
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const {
    hotList,
    enterLoading,
    suggestList: immutableSuggestList,
    songsCount,
    songsList: immutableSongsList
  } = props;
  const suggestList = immutableSuggestList.toJS();
  const songsList = immutableSongsList.toJS();
  const {
    getHotKeyWordsDispatch,
    changeEnterLoadingDispatch,
    getSuggestListDispatch,
    getSongDetailDispatch
  } = props;
  // 由于是传给子组件的方法，尽量用useCallback包裹，以使得在依赖未改变，始终给子组件传递的是相同的引用
  const searchBack = useCallback(() => {
    setShow(false);
  }, []);
  const handleQuery = (q: any) => {
    setQuery(q);
    if (!q) return;
    changeEnterLoadingDispatch(true);
    getSuggestListDispatch(q);
  }
  useEffect(() => {
    setShow(true);
    if (!hotList.size) {
      getHotKeyWordsDispatch();
    }
  }, []);
  const renderHotKey = () => {
    let list = hotList ? hotList.toJS() : [];
    return (
      <ul>
        {
          list.map((item: any) => {
            return (
              <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                <span>{item.first}</span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  const renderSingers = () => {
    let singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title">相关歌手</h1>
        {
          singers.map((item: any, index: number) => {
            return (
              <ListItem key={item.accountId + '' + index} onClick={() => props.history.push(`/singers/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%"
                    src={require('../../assets/images/default.jpg')} alt="music" />}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
              </ListItem>
            )
          })
        }
      </List>
    )
  };
  const renderAlbum = () => {
    let albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {
          albums.map((item: any, index: number) => {
            return (
              <ListItem key={item.accountId + '' + index} onClick={() => props.history.push(`/album/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%"
                    src={require('../../assets/images/default.jpg')} alt="music"/>}>
                      <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
                    </LazyLoad>
                </div>
                <span className="name">歌单：{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };
  const renderSongs = () => {
    return (
      <SongItem style={{paddingLeft: '20px'}}>
        {
          songsList.map((item: any) => {
            return (
              <li key={item.id}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.artists)} - {item.album.name}
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    )
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
                {renderSingers()}
                {renderAlbum()}
                {renderSongs()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        { enterLoading ? <Loading></Loading> : null }
      </Container>

    </CSSTransition>
  )
}
const mapStateToProps = (state: any) => ({
  hotList: state.getIn(['search', 'hotList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsCount: state.getIn(['player', 'playList']).size,
  songsList: state.getIn(['search', 'songsList'])
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotKeyWordsDispatch() {
      dispatch(getHotKeyWords())
    },
    changeEnterLoadingDispatch(data: any) {
      dispatch(changeEnterLoading(data));
    },
    getSuggestListDispatch(data: any) {
      dispatch(getSuggestList(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));
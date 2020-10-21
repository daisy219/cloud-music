// import { fromJS } from 'immutable';
import React, { useEffect } from 'react';
import Loading from '@/components/loading/index';
import Scroll from '@/components/scroll/index';

import { connect } from 'react-redux';
import { getRankList } from './store/index';
import { Container, List, ListItem, SongList, EnterLoading } from './style';
import { filterIndex } from '@/api/utils';
import { renderRoutes } from 'react-router-config';

// 映射redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
});
// 映射dispatch到props上
const mapDispatchTopProps = (dispatch: any) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    }
  }
}

const Rank: React.FC = (prop: any) => {
  const { rankList: list, loading } = prop;
  const { getRankListDataDispatch } = prop;
  let rankList = list ? list.toJS() : [];

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  // 这是渲染榜单列表函数，传入global变量来区分不同的布局方式
  const renderRankList = (list: any[], global = false) => {
    return (
      <List globalRank={global}>
        {
          list.map((item: any) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item.coverImgId)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt=''/>
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  };
  const renderSongList = (list: any[]) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}.{item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  };
  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? {"display": "none"}: {"display": ""};

  const enterDetail = (id: string) => {
    prop.history.push(`/rank/${id}`);
  }
  useEffect(() => {
    getRankListDataDispatch();
  }, [getRankListDataDispatch])
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>全球榜</h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      {renderRoutes(prop.route.routes)}
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchTopProps)(React.memo(Rank));
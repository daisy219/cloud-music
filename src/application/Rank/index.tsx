import { fromJS } from 'immutable';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store/index';
import { List, ListItem } from './style';


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

  useEffect(() => {
    getRankListDataDispatch();
  }, [])
  return (
    <div>Rank</div>
  )
}

export default connect(mapStateToProps, mapDispatchTopProps)(React.memo(Rank));
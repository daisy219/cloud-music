import React, { useEffect, useState } from 'react';
import Horizen from '@/components/horizen-item/index';
import Scroll from '@/components/scroll/index';
import Loading from '@/components/loading/index';

import { categoryTypes, alphaTypes } from '@/api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import { connect } from 'react-redux';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
  refreshMoreSingerList,

} from './store/actionCreators';

interface singerListType {
  picUrl: string;
  name: string;
  accountId: number;
}

const mapStateToProps = (state: any) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(categroy: string, alpha: string) {
      dispatch(changePageCount(0)); // 由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); // loading
      dispatch(getSingerList(categroy, alpha));
    },
    // 滑倒最底部刷新部分的处理
    pullUpRefreshDispatch(category: string, alpha: string, hot: boolean, count: number) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    // 底部下拉刷新
    pullDownRefreshDispatch(category: string, alpha: string) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); // 属于重新获取数据
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha))
      }
    }
  }
}



const Singers: React.FC = (props: any) => {
  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;
  const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');
  let handleUpdateAlpha = (val: string) => {
    setAlpha(val);
    updateDispatch(category, val);
  }
  let handleUpdateCatetory = (val: string) => {
    setCategory(val);
    updateDispatch(val, alpha);
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  }

  useEffect(() => {
    getHotSingerDispatch();
  }, [getHotSingerDispatch]);
  
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {
          list.map((item: singerListType, index: number) => {
            return (
              <ListItem key={item.accountId + "" + index}>
                <div className="img_wrapper">
                  <img src={`${item.picUrl}?param=300*300`} width="100%" height="100%" alt="music" />
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }
  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={handleUpdateCatetory}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Loading show={enterLoading}></Loading>
        <Scroll
          pullUp={ handlePullUp }
          pullDown={ handlePullDown }
          pullUpLoading={ pullUpLoading }
          pullDownLoading={ pullDownLoading }
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
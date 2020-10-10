import React, { useState } from 'react';
import Horizen from '@/components/horizen-item/index';
import { categoryTypes, alphaTypes } from '@/api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import { range_arr } from '@/utils/index';
import Scroll from '@/components/scroll/index';

interface singerListType {
  picUrl: string;
  name: string;
  accountId: number;
}

// 歌手列表
const singerList = range_arr(1, 12).map((item: number): singerListType => {
  return {
    picUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    name: "隔壁老樊",
    accountId: 277313426,
  }
})

// 渲染函数，返回歌手列表
const renderSingerList = () => {
  return (
    <List>
      {
        singerList.map((item: singerListType, index: number) => {
          return (
            <ListItem key={item.accountId+"" + index}>
              <div className="img_wrapper">
                <img src={`${item.picUrl}?param=300*300`} width="100%" height="100%" alt="music"/>
              </div>
              <span className="name">{ item.name }</span>
            </ListItem>
          )
        })
      }
    </List>
  )
}

const Singers: React.FC = () => {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');
  let handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  }
  let handleUpdateCatetory = (val: string) => {
    setCategory(val);
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
        <Scroll>
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </div>
  )
}

export default React.memo(Singers);
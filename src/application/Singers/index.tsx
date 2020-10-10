import React, { useState } from 'react';
import Horizen from '@/components/horizen-item/index';
import { categoryTypes, alphaTypes } from '@/api/config';
import { NavContainer } from './style';

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
  )
}

export default React.memo(Singers);
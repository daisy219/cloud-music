// import { fromJS } from 'immutable';
import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index';
import PropTypes from 'prop-types';
import style from '@/assets/global-style';

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`
interface ListItemType {
  key: string,
  name: string,
}

function Horizen(props: any) {
  const { list, oldVal, title } = props;
  const { handleClick } = props;

  const Category = useRef(null);
  useEffect(() => {
    let categoryDOM = Category.current as any;
    if (!categoryDOM) { return; }
    
    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele: any) => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map((item: ListItemType) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick(item.key)}
                >{item.name}</ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

Horizen.defauleProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
}

Horizen.propType = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
}

export default memo(Horizen)

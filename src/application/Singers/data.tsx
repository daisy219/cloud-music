import React, { createContext, useReducer } from 'react';
import { fromJS } from 'immutable';

// context
export const CategoryDataContext = createContext({}) as any;

// 相当于之前的constants
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHAGE_ALPHA';

// reducer 纯函数
const reducer = (state: any, action: any) => {
  switch(action.type) {
    case CHANGE_CATEGORY:
      return state.set('category', action.data);
    case CHANGE_ALPHA:
      return state.set('alpha', action.data);
    default:
      return state;
  }
}

// Provide组件
export const Data = (props: any) => {
  // useReducer的第二个参数中传入初始值
  const [data, dispatch] = useReducer(reducer, fromJS({
    category: '',
    alpha: ''
  }));
  return (
    <CategoryDataContext.Provider value= {{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  )
}
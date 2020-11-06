import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import style from '@/assets/global-style';
import { CSSTransition } from 'react-transition-group';

const ConfirmWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2666;
  background: ${style['background-color-shadow']};
  &.confirm-enter {
    opacity: 0;
  }
  &.confirm-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.confirm-exit-active {
    opacity: 0;
    transition: all 0.3s;
  }
`
const ConfirmContent = styled.div`
  margin: 100px 50px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  .header {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    padding: 20px;
    font-size: ${style['font-size-m']};
    color: ${style['font-color-desc']}
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      width: 50%;
      text-align: center;
      line-height: 40px;
      border-top: 1px solid ${style['border-color']};
    }
    .cancel {
      border-right: 1px solid ${style['border-color']};
      color: ${style['font-color-desc']};
      border-top: 1px solid ${style['border-color']};
    }
    .confirm {
      color: #fff;
      background: ${style['theme-color']};
      border-top: 1px solid ${style['theme-color']};
    }
  }
`

const Confirm = forwardRef((props: any, ref: any) => {
  const { title, text, cancelBtnText, confirmBtnText} = props;
  const { handleConfirm } = props;
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
    hide() {
      setShow(false);
    }
  }));
  const handleClose = () => {
    setShow(false);
  }
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="confirm"
      unmountOnExit
    >
    <ConfirmWrapper>
      <ConfirmContent>
        <div className="header">
          <span className="title">{title}</span>
          <i className="iconfont close" onClick={handleClose}>&#xe69a;</i>
        </div>
        <div className="content">{text}</div>
        <div className="btn-group">
          <div className="btn cancel" onClick={handleClose}>{cancelBtnText}</div>
          <div className="btn confirm" onClick={handleConfirm}>{confirmBtnText}</div>
        </div>
      </ConfirmContent>
    </ConfirmWrapper>
    </CSSTransition>
  )
})
Confirm.defaultProps = {
  title: '提示',
  text: '请确认操作',
  cancelBtnText: '取消',
  confirmBtnText: '确定'
};
export default React.memo(Confirm);
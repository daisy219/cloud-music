
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import style from '@/assets/global-style';
// import { prefixStyle } from '@/utils/index';

export const ProgressBarWrapper = styled.div`
  height: 30px;
  margin: 0 6px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style['border-color']};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`
const ProgressBar = React.forwardRef((props: any, ref: any) => {
  const { percent } = props;
  const { percentChange } = props; // 取出回调函数
  const progressBar = useRef() as any;
  const progress = useRef() as any;
  const progressBtn = useRef() as any;
  const [touch, setTouch] = useState({} as any);
  const progressBtnWidth = 4;
  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth; // 新的进度计算
    percentChange(curPercent); // 把新的进度传给回调函数并执行
  }
  // 处理进度条的偏移
  const _offset = (offsetWidth: number) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
  }
  const progressTouchStart = (event: any) => {
    const startTouch: any = {};
    startTouch.initiated = true; // initiated为true标识滑动动作开始了
    startTouch.startX = event.touches[0].pageX; // 滑动开始时横向坐标
    startTouch.left = progress.current.clientWidth; // 当前progress长度
    setTouch(startTouch);
  }
  const progressTouchMove = (event: any) => {
    if (!touch.initiated) { return; }
    // 滑动距离
    const deltaX = event.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  }
  const progressTouchEnd = (event: any) => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    _changePercent();
  }
  const progressClick = (event: any) => {
    const start = progressBar.current.offsetLeft;
    const offsetWidth = event.pageX - start;
    _offset(offsetWidth);
    _changePercent();
  }

  // 监听percent
  useEffect(() => {
    if (percent >= 0 && percent <=1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }, [progress, percent, progressBar, progressBtn, touch.initiated]);

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div className="progress-btn-wrapper" ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
          
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
})

export default React.memo(ProgressBar);

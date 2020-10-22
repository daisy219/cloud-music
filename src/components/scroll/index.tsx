// eslint-disable-next-line
import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
import Loading from '../loading/index';
import Loading2 from '../loading-v2/index';
import { debounce } from '@/api/utils';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

// interface SliderProps extends React.Props<any> {
//   bannerList: any
// }
const Scroll = React.forwardRef ((props: any, ref: any) => {
  const [bScroll, setBScroll] = useState();
  const scrollContaninerRef = useRef();
// eslint-disable-next-line
  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;
  const pullUpDisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' };
  const pullDownDisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' };

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp]);
  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown])
  useEffect(() => {
    // @ts-ignore
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
  }, [bounceTop, click, bounceBottom, direction]);

  useEffect(() => {
    if (bScroll && onScroll) {
      (bScroll as any).on('scroll', (scroll: any) => {
        onScroll(scroll);
      })
      return () => {
        (bScroll as any).off('scroll');
      }
    }
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
      // 判断是否滑动到了底部
      if ((bScroll as any).y <= (bScroll as any).maxScrollY + 100) {
        pullUpDebounce();
      }
    }
    (bScroll as any).on('scrollEnd', handlePullUp);
    // 解绑
    return () => {
      (bScroll as any).off('scrollEnd', handlePullUp);
    }
  }, [pullUp, bScroll, pullUpDebounce]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos: any) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    }
    (bScroll as any).on('touchEnd', handlePullDown);
    return () => {
      (bScroll as any).off('touchEnd', handlePullDown);
    }
  }, [pullDown, bScroll, pullDownDebounce]);

  useEffect(() => {
    if (refresh && bScroll) {
      (bScroll as any).refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        (bScroll as any).refresh();
        (bScroll as any).scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    // @ts-ignore
    <ScrollContainer ref= { scrollContaninerRef } >
    { props.children }
    {/* 滑倒底部动画 */}
      <PullUpLoading style={pullUpDisplayStyle}><Loading></Loading></PullUpLoading>
      <PullDownLoading style={pullDownDisplayStyle}><Loading2></Loading2></PullDownLoading>
    </ScrollContainer>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll;
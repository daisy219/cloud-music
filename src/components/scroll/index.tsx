// eslint-disable-next-line
import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
// interface SliderProps extends React.Props<any> {
//   bannerList: any
// }
const Scroll = React.forwardRef ((props: any, ref: any) => {
  const [bScroll, setBScroll] = useState(null);
  const scrollContaninerRef = useRef();
// eslint-disable-next-line
  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;

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
    if (!bScroll || !onScroll) return;
    (bScroll as any).on('scroll', (scroll: any) => {
      onScroll(scroll);
    })
    return () => {
      (bScroll as any).off('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    (bScroll as any).on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if ((bScroll as any).y <= (bScroll as any).maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      (bScroll as any).off('scrollEnd');
    }
  }, [pullUp, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    (bScroll as any).on('touchEnd', (pos: any) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      (bScroll as any).off('touchEnd');
    }
  }, [pullDown, bScroll]);

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
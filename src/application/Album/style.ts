import styled from 'styled-components';
import style from '@/assets/global-style';

interface TopDescPropType {
  background: any;
}
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color"]};
  transform-origin: right bottom;

  /* &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-appear.fly-appear-active,
  &.fly-appear-done.fly-enter-done {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  } */
  &.fly-enter, &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`
export const TopDesc = styled.div`
  background-size: 100%;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;
  .background {
    z-index: -1;
    background: url(${(props: TopDescPropType) => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(10px); // 高斯模糊
    .filter {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, .4), hsla(0, 0%, 100%, 0));
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${style["font-color-light"]};
      font-weight: 700px;
      line-height: 1.5;
      font-size: ${style["font-size-l"]};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${style["font-size-m"]};
        color: ${style["font-color-desc-v2"]};
      }
    }
  }
` as React.FC<TopDescPropType>;
export const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  >div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size:  ${style["font-size-s"]};
    color: ${style["font-color-light"]};
    z-index: 1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`


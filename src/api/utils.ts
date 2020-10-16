// 防抖函数
export const debounce = (func: Function, delay: number) => {
  let timer: any;
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  }
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList: any) => {
  for(let i = 0; i < rankList.length - 1, i++;) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.lenght) {
      return i + 1;
    }
  }
}
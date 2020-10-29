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
  for(let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
}

// 处理歌手列表拼接歌手名字
export const getName = (list: any[]) => {
  let str = '';
  list.map((item: any, index: number) => {
    str += index === 0 ? item.name: '/' + item.name;
    return item;
  });
  return str;
}

// 拼接出歌曲的url链接
export const getSongUrl = (id: string) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
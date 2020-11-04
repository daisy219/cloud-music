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
export const getSongUrl = (id: string | number) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机算法
export function shuffle(arr: any[]) {
  let new_arr: any[] = [];
  arr.forEach((item: any) => {
    new_arr.push(item);
  });
  for (let i = 0; i< new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song: any, list: any[]) => {
  return list.findIndex((item: any) => {
    return song.id === item.id;
  });
};
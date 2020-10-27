
/**
 * 创建区间数组
 *
 *
 * @export
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
export function range_arr(start: number, end: number): number[] {
  const len = end - start + 1;
  let step = start - 1;

  if (len <= 0) {
    return [];
  }

  return (Array as any).apply(null, { length: Math.abs(len) })
    .map(() => ++step);
}


export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

/**
 * Promise封装等待时间
 */
export function waitTime(time: number) {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove();
    }, time);
  })
}

/**
 * 判断一个对象是否为空
 */
export const isEmptyObject = (obj: any) => !obj || Object.keys(obj).length === 0;

// 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
let elementStyle = document.createElement('div').style;
let vendor = (() => {
  // 首先通过transition属性判断是何种浏览器
  let trandformNames = {
    wekit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'Transform'
  };
  for (let key in trandformNames) {
    if (elementStyle[trandformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style: string) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
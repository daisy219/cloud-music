
import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1604975889888'); /* IE9 */
  src: url('iconfont.eot?t=1604975889888#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1604975889888') format('woff'),
  url('iconfont.ttf?t=1604975889888') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1604975889888#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconqingkong:before {
  content: "\e63a";
}

.iconguanbi:before {
  content: "\e688";
}

.iconshanchu:before {
  content: "\e626";
}

.icondanquxunhuan:before {
  content: "\e635";
}

.iconzantingtingzhi:before {
  content: "\e613";
}

.iconbofangliebiao1:before {
  content: "\e601";
}

.icon1_music87:before {
  content: "\e6b3";
}

.icon1_music85:before {
  content: "\e6b4";
}

.icon1_music90:before {
  content: "\e6b1";
}

.icon1_music93:before {
  content: "\e6b2";
}

.iconshouting:before {
  content: "\e61e";
}

.iconpinglun:before {
  content: "\e600";
}

.icontubiao-yuanshi-:before {
  content: "\e7bc";
}

.icondianzan:before {
  content: "\e629";
}

.iconfanhui2:before {
  content: "\e69a";
}

.icon1_music82:before {
  content: "\e6a9";
}

.icon1_music84:before {
  content: "\e6ab";
}

.icon1_music86:before {
  content: "\e6ac";
}

.icon1_music83:before {
  content: "\e6ad";
}

.icon1_music95:before {
  content: "\e6ae";
}

.icon1_music80:before {
  content: "\e6af";
}

.icon1_music81:before {
  content: "\e6aa";
}

.icon1_music89:before {
  content: "\e6b0";
}`


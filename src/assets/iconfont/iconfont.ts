
import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1604472052146'); /* IE9 */
  src: url('iconfont.eot?t=1604472052146#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1604472052146') format('woff'),
  url('iconfont.ttf?t=1604472052146') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1604472052146#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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


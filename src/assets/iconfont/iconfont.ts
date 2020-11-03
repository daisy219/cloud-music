
import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1604387126522'); /* IE9 */
  src: url('iconfont.eot?t=1604387126522#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1604387126522') format('woff'),
  url('iconfont.ttf?t=1604387126522') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1604387126522#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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


import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1577345037914'); /* IE9 */
  src: url('iconfont.eot?t=1577345037914#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('iconfont.woff?t=1577345037914') format('woff'),
  url('iconfont.ttf?t=1577345037914') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1577345037914#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconaddto:before {
  content: "\e698";
}

.icondelete:before {
  content: "\e699";
}

.iconsettings:before {
  content: "\e69a";
}

.iconcancel:before {
  content: "\e69b";
}

.iconmusiclist:before {
  content: "\e69c";
}

.iconfavoriteslist:before {
  content: "\e69d";
}

.iconnextsong:before {
  content: "\e69e";
}

.iconplay:before {
  content: "\e69f";
}

.iconclose:before {
  content: "\e6a0";
}

.iconcollection:before {
  content: "\e6a1";
}

.iconsoundsize:before {
  content: "\e6a2";
}

.iconhistory:before {
  content: "\e6a3";
}

.iconrestore:before {
  content: "\e6a4";
}

.icontimeout:before {
  content: "\e6a5";
}

.iconnickname:before {
  content: "\e6a6";
}

.iconback:before {
  content: "\e6db";
}

.iconinfo:before {
  content: "\e6de";
}

.iconsearch:before {
  content: "\e6e1";
}

.iconstepback:before {
  content: "\e6e2";
}

.iconvolume:before {
  content: "\e6e3";
}`


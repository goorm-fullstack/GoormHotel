import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* { box-sizing: border-box; }

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, button, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
	font-size: 100%;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

html, body {
	width: 100%;
}

body {
	min-width: 1260px;
	line-height: 1;
  font-family: 'Pretendard', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
	color: #111;
}

ol, ul, li {
	list-style: none;
}

blockquote, q {
	quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

img {
	max-width: 100%;
}

button {
  cursor: pointer;
}

a, abbr {
	text-decoration: none;
}

a, button {
	transition: .2s all ease-in-out;
	text-decoration: none;
	color: inherit;
}

input {
	border: 1px solid #ddd;
	padding: 0 8px;
	font: inherit;
	font-size: 15px;

	&.long {
		width: 80%;
	}
}

input[type="file"] {
	border: 0;
	padding: 0;
	height: 36px;
	line-height: 36px;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  padding: 0 39px 0 15px;
  background-image: url('data:image/svg+xml;utf8,<svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" fill="gray" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "/></svg>');
  background-repeat: no-repeat;
  background-position: 90% center; 
	background-size: 14px;
  padding-right: 30px; 
  cursor: pointer;
	border: 1px solid #ddd;
	height: 40px;
	width: 152px;
	font-size: 14px;
	letter-spacing: -0.02em;

	&:disabled {
		color: #444;
    background-color: #f7f7f7;
    background-image: none;
  }
}

::selection {
	background: #95846E;
	color: white;
}

`;

export default GlobalStyle;

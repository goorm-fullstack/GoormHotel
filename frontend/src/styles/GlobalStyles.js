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
	line-height: 1;
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
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

a {
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
	font-size: 16px;
	font: inherit;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  padding: 10px;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23444444" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right center; 
  padding-right: 30px; 
  cursor: pointer;
}

@media (max-width: 1260px) {
  body {
    overflow-x: hidden;
  }
}
`;

export default GlobalStyle;

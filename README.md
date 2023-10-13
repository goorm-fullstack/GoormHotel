# 🏰 구름 호텔(Goorm Hotel) 웹 사이트

구름(goorm) 풀스택 개발자 성장 과정 1기 3차 스터디 기간 중 진행된 11조 리벤져스 팀 프로젝트입니다. 가상 호텔 '구름 호텔'을 기획하고 사용자가 직접 서비스를 예약할 수 있는 자사 웹 사이트 서비스를 설계 및 구축했습니다. 주요 기능으로는 회원 관리 및 멤버십, 상품관리, 예약 및 결제, 게시판, 채팅 기능이 있으며 서비스 고도화 과정에서 유지보수와 보안 측면을 고려하여 사용자 페이지와 관리자 페이지를 분리하였습니다.

<br>

[**💻 구름 호텔(Goorm Hotel) 웹 사이트 바로가기**](https://web-goormhotel-front-2rrqq2blmrcd5gx.sel5.cloudtype.app/)

<br>

## 📌 프로젝트 개요

- **프로젝트 기간:** 2023.08.21 ~ 2023.10.10
- **주요 목표와 하위 목표**
  - 호텔 서비스를 제공할 수 있는 UI 설계 및 구현
    - 크로스 브라우징을 통해 다양한 브라우저에서 일관된 사용자 경험 제공
  - 회원 관리 및 멤버십 기능 구현
    - 회원 가입, 로그인, 아이디 찾기, 비밀번호 재설정, 아이디 기억하기 기능 구현
    - OAuth를 사용한 소셜 로그인 기능 구현
    - 회원에게 조건에 따라 역할을 부여하고 혜택을 제공하는 멤버십 기능 구현
    - 부운영자 관리 및 권한 시스템 구현
  - 상품관리 기능 구현
    - 스페셜 오퍼 상품 CRUD 및 검색 기능 구현
    - 오프라인 판매를 가정한 상품권 관리 기능 구현
  - 예약 및 결제 기능 구현
    - 스페셜 오퍼 상품 예약 및 포트원 API를 사용한 결제 기능 구현
  - 게시판 기능 구현
    - 게시글 CRUD 및 검색 기능 구현
    - 댓글 CRUD 기능 구현
  - 채팅 기능 구현
    - 웹 소켓을 사용하여 로그인 한 회원과 관리자 간 실시간 채팅 기능 구현

<br>

## 😎 조원 소개

<table>
  <tr>
    <th colspan="2" align="center">프로필</th>
    <th align="center">역할</th>
    <th align="center">작업 영역</th>
  </tr>
    <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/12975617?v=4" width="70"></td>
    <td>김경규(<a href="https://github.com/WhiteKIM" target="_blank">@WhiteKIM</a>)<br>Full-Stack</td>
    <td align="center">조원</td>
    <td>멤버십, 상품권/쿠폰, 채팅, 뉴스레터 구독 기능 구현, 일부 페이지 제작 참여</td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/121299334?v=4" width="70"></td>
    <td width="200">문소희(<a href="https://github.com/soheetech" target="_blank">@soheetech</a>)<br>Full-Stack</td>
    <td width="60" align="center">조원</td>
    <td>스페셜 오퍼 상품 예약 및 결제 기능 구현, FE 전 페이지 점검 및 최종 수정, JS->TS 마이그레이션, CSS 모듈화 및 통합 작업 주도</td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/58635833?v=4" width="70"></td>
    <td>박지국(<a href="https://github.com/parkjikuk" target="_blank">@parkjikuk</a>)<br>Front-End</td>
    <td align="center">조원</td>
    <td>다수 페이지 제작 및 UI 기능 구현, FE 작업 주도</td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/123534245?v=4" width="70"></td>
    <td>배진환(<a href="https://github.com/JinhwanB" target="_blank">@JinhwanB</a>)<br>Full-Stack</td>
    <td align="center">조원</td>
    <td>상품 CRUD 및 카테고리화, 검색 기능 구현, 일부 페이지 제작 참여 및 JS->TS 마이그레이션 작업 주도</td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/62269067?v=4" width="70"></td>
    <td>이동규(<a href="https://github.com/LEE-Donggyu" target="_blank">@LEE-Donggyu</a>)<br>Full-Stack</td>
    <td align="center">조장</td>
    <td>게시글 CRUD 및 카테고리화, 검색, 댓글 CRUD 기능 구현, 일부 페이지 제작 참여</td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/50459192?v=4" width="70"></td>
    <td>전민종(<a href="https://github.com/yss1902" target="_blank">@yss1902</a>)<br>Full-Stack</td>
    <td align="center">조원</td>
    <td>회원 관리 시스템(회원 가입, 로그인, 회원 정보 수정, 아이디 찾기, 비밀번호 재설정 등), 소셜 로그인 기능 구현, 일부 페이지 제작 참여</td>
  </tr>
</table>

<br>

## 💻 사용한 기술

### Front-End

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">

### Back-End

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">

### DB

<img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white"> <img src="https://img.shields.io/badge/h2-0000bb?style=for-the-badge&logo=h2&logoColor=white">

### ETC

<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/gitbook-3884FF?style=for-the-badge&logo=gitbook&logoColor=white"> <img src="https://img.shields.io/badge/googlesheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white">

<br>

## ✍🏻 Architecture

![구름호텔아키텍처](https://github.com/goorm-fullstack/GoormHotel/assets/121299334/36c470cf-02f3-4830-8a40-13f3cb609b61)

<br>

## 📁 Repository 구조

```
GoormHotel
```

<br>

## 💾 ERD

![GoormHotel](https://github.com/goorm-fullstack/GoormHotel/assets/121299334/94a5bff8-835a-49b9-b33b-db8143064728)

<br>

## 📌 더보기

- [패키지(디렉터리) 구조 변경](https://github.com/goorm-fullstack/GoormHotel/issues/26)

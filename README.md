# codestates-fe-advanced-course

## 완성된 GIF 파일 및 배포 링크

- [배포링크](http://fe-advanced-robin14dev.s3-website.ap-northeast-2.amazonaws.com/)

## 프로젝트 실행 방법

1. 로컬에 git clone 으로 해당 repository를 클론합니다.
1. 로컬에 `git clone` 으로 해당 repository를 클론합니다.
1. `npm install`로 `package.json`에 있는 모듈들을 다운받습니다.
1. `env.example`에 들어있는 환경변수명에 다음과 같은 url값을 할당한 후, `.env`로 변경합니다.
   `https://jsonplaceholder.typicode.com`
1. `npm run start`로 앱을 실행합니다.

## 사용한 스택 목록

- HTML
- CSS
- JavaScript
- JavaScript Framework : React
- AWS(S3)

## 구현한 기능 목록 (Software Requirement Specification)

- 게시물 리스트 페이지
- 각 게시물 당 상세페이지

## 구현 방법 혹은 구현하면서 어려웠던 점

### 게시물 리스트 구현

- 앱을 실행하면, Mainpage 컴포넌트에서 외부API를 호출하여 게시물 데이터들을 불러옵니다.
- 데이터들을 상태로 지정한 후, PostList 컴포넌트를 만들어 props로 해당 데이터들을 내려줍니다.
- 총 게시물의 개수와, 게시물들이 한페이지에서 몇개를 보여줘야 할지 변수를 지정한 후, 해당 조건에 맞게 데이터를 제목과 작성자로 렌더링합니다.
- `react-router-dom` 라이브러리로 useNavigate를 사용하여 특정 게시물을 클릭하면 해당 글의 상세페이지로 이동할 수 있도록 구현하였습니다.
- `useNavigate`와 `useLocation`을 활용하여 URI에 따른 게시물의 정보를 렌더링 할 수 있도록 구현하였고 이는 웹사이트 공유시 해당 URI에 따른
  정보들이 전해질 수 있도록 만들었습니다.
- 각 게시물 리스트는 제목과 작성자 글 내용으로 구성되며, 제목은 1줄, 내용은 2줄로 제한 하여 한 화면에 여러 게시글 목록을 볼 수 있도록 구현하였습니다.
  ![image](https://user-images.githubusercontent.com/95751232/183092782-93f8133e-2e27-4fa5-8384-15da2b1e39b6.png)

### 각 게시물 당 상세페이지 구현

- `post`라는 엔드포인트로 분기를 하여 postList에서 받아온 post.id를 이용해 외부API를 호출하여 상세 내용과 댓글 데이터를 불러옵니다.
  ![image](https://user-images.githubusercontent.com/95751232/183093209-7e02124d-3955-4a56-b02e-9501f1ee4b04.png)

### 전체

- CSS는 `styled-component`를 이용하여 구현하였고, 버튼 컴포넌트를 props로 두어 숫자 버튼과 화살표 버튼을 재활용 할 수 있게 구현하였습니다.

## 추가 구현 사항에 대한 구현 방법과 설명

### 검색기능

- 특정 검색 결과에 따른 필터링된 정보가 렌더링 됩니다.
- 특정 검색어가 게시물 목록에 어디에 속해있는지 mark 태그 를 이용하여 하이라이트 기능을 추가하였습니다.
  - ![검색화면_AdobeExpress](https://user-images.githubusercontent.com/95751232/183073760-95a42657-8808-498f-806b-094256a4b782.gif)
- 검색 결과와 검색 결과에 따른 특정 페이지를 `?query=esse&page=2` 와 같이 uri를 구성하여 특정 검색결과를 그대로 공유할 수 있게 구현하였습니다.
  ![image](https://user-images.githubusercontent.com/95751232/183094177-1103435b-4923-412a-9c0f-decd60a04e5b.png)

### 반응형 CSS

- laptop 화면부터 mobile 화면까지 반응형 CSS를 구현하였습니다.
- 태블릿 이하의 크기에서는 화면 크기를 고려하여, 페이지네이션 버튼의 개수를 10개에서 5개로 축소하였습니다.
  - ![반응형-메인페이지_AdobeExpress](https://user-images.githubusercontent.com/95751232/183074897-ddbc4dac-4d00-4681-a0c5-6250b2f5917c.gif)
- 모바일 화면에서는 글 제목과 작성자만 렌더링 되도록 구현하였습니다.
  - ![모바일화면_AdobeExpress](https://user-images.githubusercontent.com/95751232/183074160-0a370fda-935a-4635-816c-f24d930a75fa.gif)

### 탭 이름 동적 변경

- `react-helmet-async` 라이브러리를 활용하여, favicon과 탭 이름을 변경하였습니다.
- 특정 글의 상세페이지로 이동할 시에는 해당 글의 제목이 탭 이름에 나오게 구현하여 유저가 현재 이용중인 사이트의 내용을 탭을 보면서유추할 수 있게 구현하였습니다.

  ![helmet_AdobeExpress](https://user-images.githubusercontent.com/95751232/183076027-56bde2db-14b5-4674-a4d0-70b7b21d7699.gif)

### 스크롤 이동

- 웹페이지의 높이가 길어지는 현상으로 스크롤의 노동?을 방지하기 위해서 스크롤바 옆에 상단으로 이동할 수 있는 버튼을 구현하였습니다.
  ![스크롤이동_AdobeExpress](https://user-images.githubusercontent.com/95751232/183076587-1cf7dc1d-7a24-44fc-80bb-93da61478301.gif)
- 모바일 화면에서는 보여지는 정보들이 줄어들고 화면 크기가 작기 때문에 버튼이 보이지 않게 구현하였습니다.

- 화면의 제일 위에 보이는 `FE-Advanced`를 클릭시 페이지가 새로고침되도록 구현하였습니다.

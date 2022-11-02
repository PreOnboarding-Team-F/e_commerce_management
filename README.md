# e_commerce_management
## 프로젝트 개요

**제품 쇼핑몰 관리 Rest API 입니다.**

> 주문내역 확인(목록, 검색, 필터링) 쿠폰관리(타입신설, 코드발급, 사용내역 열람 등)<br> 
제품 배송 상태 업데이트 기능을 구현하였고, 추후 구매내역 API를 추가하기 위해 구매하기 테스트 코드 구현을 하였습니다.
>
>기업에서 제공받은 모델 이외에 쿠폰시스템을 위한 데이터베이스 업데이트 작업도 진행하였습니다.
>


## 기술 스택
- Framework: express
- ORM : sequelize
- DB : mysql

## DB Modeling
![image](https://user-images.githubusercontent.com/55984573/199422920-6ed7c047-4da3-48a9-b4d3-66723e5e0595.png)

- coupon_status(PK:id) - coupons(FK:coupon_status_id) : 1 - N
- coupons(PK:id) - coupon_histories(FK:coupon_id) : 1 - N
- users(PK:id) - coupon_histories(user_id:FK) : 1 - N
- users(PK:id) - orders(user_id:FK) : 1 - N
- order_status(PK:id) - orders(FK:order_status_id) : 1 - N
- delivery_status(PK:id) - orders(FK:delivery_status_id) : 1 - N
- countries(PK:id) - orders(FK:country_id) : 1 - N
- countries(PK:id) - delivery_cost(FK:country_id) : 1 - N 


## API 문서
자세한 내용은 Docs 참조
| 기능구분  | 기능  | Method | URL | 
| ------------- | ------------- | ------------- | ------------- | 
| Order |  | POST | /orders/  |                 
|  |   | POST | /orders/  | 
|  | 배송상태변경  | PATCH  | /orders/:id/delivery  |
| Coupon |  쿠폰생성  | POST | /coupon/create  | 
|  | 쿠폰 발급 | POST  | /coupon/ |
|  | 쿠폰 사용 | PATCH  | /coupon/ |  |
|  |   |   |   |
|  | 공지사항 글 상세  | GET  | /board/notice/:id |
|  | 운영게시판 글 상세  | GET  | /board/operation/:id | true |
|  | 글 작성  | POST  | /board/post | true |
|  | 글 수정  | PATCH  | /board/post/:id | true |
|  | 글 삭제  | DELETE  | /board/post/:id | true |
| Comment | 댓글 목록  | GET  | /comment/post?boardId={value}  | 
|  | 댓글 작성  | POST  | /comment/post?boardId=value  | true |
|  | 댓글 수정  | PATCH  | /comment/post?boardId=value  | true |
|  | 댓글 삭제  | DELETE  | /comment/post?boardId=value  | true |
| 통계 | 성별  | GET  | /statistics/gender  | true |
|  | 나이  | GET  | /statistics/age  | true |
|  | 접속시간 | GET  | /statistics/accesstime  | true |
|  | 방문횟수 | GET  | /statistics/visit  | true |

## 구현 기능 관련
<b>제품 주문 배송 관련</b>
- 제품 주문 내역 전체 불러오기
- 주문 내역 및 주문자명으로 검색
- 특정 기간에 따른 필터링
    - 시작일 ~ 종료일
- 결제완료 주문건에 대하여 발송처리
- 발송 처리 후 배송 상태 업데이트
    - 운송장 번호 랜덤 생성
    - 배송 상태(배송중, 배송완료)

<b>쿠폰 관련</b>
- 새로운 쿠폰 생성
    - 쿠폰 타입(배송비 할인, % 할인, 정액 할인)
    - 쿠폰 코드 랜덤 생성
    - 타입별 할인율 지정
- 쿠폰 발급
    - 유저에게 쿠폰 발급
- 쿠폰 사용
    - 각 쿠폰 별 사용 횟수와 총 할인 금액
    
<b>구매하기 테스트 코드 관련</b>
- 쿠폰 사용 할인 적용
- 구매 국가, 구매 갯수에 따른 배송비 적용
    - 해외 배송시 환율 1200원 : 1달러로 적용
    
## 설치 및 실행 방법
nodejs와 npm이 install 되어있지 않다면 먼저 install 과정 진행
<details>
    <summary> 프로젝트 설치 밀 실행 과정</summary>

<b>1. 프로젝트 clone 및 디렉토리 이동</b>
```bash
git clone https://github.com/PreOnboarding-Team-F/community_service.git
cd community_service
```
<b>2. .env 파일 생성</b>
```bash
PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=commerce
DB=mysql
DB_SYNC=false
```
<b>3. node package 설치</b>
```javascript
npm install
```
<b>4. 서버 실행</b>
```javascript
npm start
```
</details>

<details>
    <summary>Test 실행 방법</summary>
    
<b>1. .env.test 파일 생성</b>
```bash
PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=test_commerce
DB=mysql
DB_SYNC=true
```
<b>2. test 실행</b>
```javascript
npm run test
```
</details>




# GoormHotel
☁ 2차 스터디 5조 구름기사단 프로젝트: 구름 호텔 웹사이트입니다.

## 진행 상황 - 김경규[BE]
- `2023.08.22` - 이메일 서비스 구현 완료?, 채팅 서비스 구현중
- `2023.08.23` - 채팅 서비스 테스트 완료 -> 세부 기능 결정해야함, 쿠폰 서비스 구현중 -> 테스트 완료했지만 연관 관계 조정 필요
- `2023.08.24` - 쿠폰, 상품권 기본 로직 구현 완료 -> 테스트 성공적, 다만 로직이 복잡하고 코드가 보기 좋지 않아서 개선할 필요가 있다고 판단됨
- `2023.08.26` - 이메일 뉴스레터 구독 확인 기능 완료 -> 테스트 완료, 자세한 내용은 API 문서 확인 요망
- `2023.08.27` - 쿠폰 로직 변경 -> 하나의 함수를 이용해서 모든 케이스에서 동작하도록 변경 -> 로직 동작 확인, 예약 조회가 안되는 중(StackOverflow) 참고
- `2023.08.28` - 쿠폰, 상품권 요청 응답 분리
- `2023.08.29` - 쿠폰 사용기간 로직 완료, 유저 최초 생성시에 쿠폰 생성 기능 완료, 매달 1일 쿠폰이 추가되도록 하는 로직 구현 완료, 프로젝트 구조를 기존 계층형 구조에서 DDD 구조로 변경
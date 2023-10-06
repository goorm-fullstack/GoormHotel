import styled from 'styled-components';

export const CouponWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.graybg};
  height: 200px;
  position: relative;
  display: flex;
  margin-bottom: 10px;
  padding: 0 70px;
  overflow: hidden;
  align-items: center;
  gap: 0 30px;

  &::before,
  &::after {
    // 쿠폰 펀치 모양
    content: '';
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
  }

  &::before {
    // 펀치 모양 위치 설정
    left: 0;
    transform: translate(-50%, -50%);
  }

  &::after {
    // 펀치 모양 위치 설정
    right: 0;
    transform: translate(50%, -50%);
  }

  svg {
    // 쿠폰 보석 아이콘
    width: 110px;

    &.bronze path {
      fill: url('#gradient1');
    }
    &.silver path {
      fill: url('#gradient2');
    }
    &.gold path {
      fill: url('#gradient3');
    }
  }

  .couponinfo {
    // 쿠폰 정보
    width: 230px;
    line-height: 1.5;

    .ctitle {
      // 등급 혜택 타이틀
      font-size: ${(props) => props.theme.font.sizexs};
      text-transform: capitalize;

      &.bronze {
        color: ${(props) => props.theme.memberColors.bronze};
      }
      &.silver {
        color: ${(props) => props.theme.memberColors.silver};
      }
      &.gold {
        color: ${(props) => props.theme.memberColors.gold};
      }
    }

    .cname {
      // 쿠폰명
      font-size: ${(props) => props.theme.font.sizel};
      color: ${(props) => props.theme.colors.charcoal};
      margin-bottom: 10px;
    }

    .publish {
      // 날짜 설정
      font-size: ${(props) => props.theme.font.sizexs};
      color: ${(props) => props.theme.colors.graylight};

      &.use {
        // 사용 기한
        width: 232px;
      }
    }
  }
`;

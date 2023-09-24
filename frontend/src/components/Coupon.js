import React from 'react';
import { styled } from 'styled-components';

const CouponWrapper = styled.div`
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
    content: '';
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
  }

  &::before {
    left: 0;
    transform: translate(-50%, -50%);
  }

  &::after {
    right: 0;
    transform: translate(50%, -50%);
  }
`;

const GradeIcon = styled.svg`
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
`;

const CounponInfo = styled.div`
  width: 230px;
  line-height: 1.5;
`;

const CouponTitle = styled.p`
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
`;

const CouponName = styled.p`
  font-size: ${(props) => props.theme.font.sizel};
  color: ${(props) => props.theme.colors.charcoal};
  margin-bottom: 10px;
`;

const PublishDate = styled.p`
  font-size: ${(props) => props.theme.font.sizexs};
  color: ${(props) => props.theme.colors.graylight};
`;

const DateOfUse = styled(PublishDate)`
  width: 232px;
`;
const Coupon = ({ grade }) => {
  return (
    <CouponWrapper>
      <GradeIcon className={grade} data-name="Layer 1" id="Layer_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#493323" />
            <stop offset="50%" stopColor="#EAAC7F" />
            <stop offset="100%" stopColor="#91684A" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#61677a"></stop>
            <stop offset="50%" stopColor="#d8d9da"></stop>
            <stop offset="100%" stopColor="#61677a"></stop>
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6a492b"></stop>
            <stop offset="50%" stopColor="#f1ca89"></stop>
            <stop offset="100%" stopColor="#c5a880"></stop>
          </linearGradient>
        </defs>
        <title />
        <path d="M10.88,52.67A.92.92,0,0,0,11,53h0a1.56,1.56,0,0,0,.16.2l.11.08a.39.39,0,0,0,.1.08l20.84,12s0,0,.07,0l.08,0a.89.89,0,0,0,.69,0,.2.2,0,0,0,.08,0l.08,0L54,53.37l.1-.08.1-.08a1,1,0,0,0,.16-.2h0a.92.92,0,0,0,.11-.33s0-.06,0-.09,0,0,0-.08V28.44s0-.05,0-.08,0-.06,0-.09a1,1,0,0,0-.11-.33h0a1,1,0,0,0-.23-.26l-.07-.06L54,27.57l-20.84-12-.08,0-.08,0a1,1,0,0,0-.34-.07h0a1,1,0,0,0-.34.07l-.08,0-.07,0-20.84,12s0,0-.07.05l-.07.06a1,1,0,0,0-.23.26h0a1,1,0,0,0-.11.33s0,.06,0,.09,0,.05,0,.08V52.5s0,.06,0,.08S10.88,52.64,10.88,52.67Zm41.66-1.9-7-4V34.21l7-4Zm-31.7-2.3L31.7,54.74v8.07L13.86,52.5ZM32.7,27.94,43.55,34.2V46.74L32.7,53,21.84,46.74V34.2Zm1,26.8,10.85-6.27,7,4L33.7,62.81ZM44.55,32.47,33.7,26.2V18.14l17.84,10.3ZM31.7,26.2,20.84,32.47l-7-4L31.7,18.14Zm-11.86,8V46.74l-7,4V30.17Z" />
        <path d="M35.21,79.68a.86.86,0,0,0-.2.18l-.09.14a.47.47,0,0,0-.06.09.9.9,0,0,0,0,.16s0,.06,0,.1l-3,23a.85.85,0,0,0,0,.16.57.57,0,0,0,0,.13,1,1,0,0,0,.11.34h0a1.55,1.55,0,0,0,.19.24l.07,0a.76.76,0,0,0,.19.12l0,0,21.39,8.9a.61.61,0,0,0,.13,0s.08,0,.13,0h.13a.81.81,0,0,0,.31-.06l.09,0,.1,0L85.32,95.54a0,0,0,0,1,0,0,1.06,1.06,0,0,0,.29-.27l0-.08a1.27,1.27,0,0,0,.07-.12.8.8,0,0,0,0-.15,1,1,0,0,1,0-.1l3-23s0-.1,0-.15v-.14a.93.93,0,0,0-.12-.33h0a.88.88,0,0,0-.24-.27.41.41,0,0,0-.11-.07.57.57,0,0,0-.13-.08L66.79,61.87l-.11,0-.14-.05h-.28a1.2,1.2,0,0,0-.27.08s-.06,0-.08,0L35.28,79.61A.46.46,0,0,0,35.21,79.68ZM84,93.25l-7.3-3,1.53-11.82,8.32-4.81ZM65.2,73.81l11,4.59L74.67,90.22,55.4,101.34l-11-4.58,1.54-11.82ZM43.38,98.5l11,4.59-1,7.84-18.32-7.62Zm13,4.58L75.67,92l6.89,2.87L55.44,110.48ZM77.22,76.65l-11-4.58,1-7.85,18.31,7.63Zm-13-4.57L44.93,83.2,38,80.33,65.15,64.67ZM43.91,85,42.38,96.77l-8.33,4.81L36.6,81.9Z" />
        <path d="M79.24,13l-12.68.3a1,1,0,0,0-1,1l0,38.78a1,1,0,0,0,1,1l38.78,0h0a1,1,0,0,0,1-1l.3-12.68a1,1,0,0,0-.29-.73L80,13.29A1,1,0,0,0,79.24,13Zm8.13,10.52-9.91.24-8.52-8.52L78.86,15Zm6.84,6.84L94,40.28,79.41,25.71l9.92-.23ZM67.59,16.71,75.82,25,67.6,48.08Zm9.8,9.8L93.18,42.3,68.69,51ZM94.74,43.87,103,52.1H71.61Zm9.71,6.88-8.52-8.52.24-9.91,8.51,8.51Z" />
        <path d="M104,69.75a1,1,0,0,0-2,0V72a1,1,0,0,0,2,0Z" />
        <path d="M103,76.7a1,1,0,0,0-1,1v2.21a1,1,0,0,0,2,0V77.7A1,1,0,0,0,103,76.7Z" />
        <path d="M108.07,73.83h-2.21a1,1,0,0,0,0,2h2.21a1,1,0,0,0,0-2Z" />
        <path d="M101.11,74.83a1,1,0,0,0-1-1h-2.2a1,1,0,0,0,0,2h2.2A1,1,0,0,0,101.11,74.83Z" />
        <path d="M111.07,24.67a1,1,0,0,0,1-1v-2.2a1,1,0,0,0-2,0v2.2A1,1,0,0,0,111.07,24.67Z" />
        <path d="M110.07,31.62a1,1,0,1,0,2,0v-2.2a1,1,0,0,0-2,0Z" />
        <path d="M116.14,27.54a1,1,0,0,0,0-2h-2.2a1,1,0,0,0,0,2Z" />
        <path d="M108.19,25.54H106a1,1,0,0,0,0,2h2.2a1,1,0,0,0,0-2Z" />
        <path d="M22.7,103.85a1,1,0,0,0-2,0v2.2a1,1,0,0,0,2,0Z" />
        <path d="M21.7,110.8a1,1,0,0,0-1,1V114a1,1,0,0,0,2,0v-2.2A1,1,0,0,0,21.7,110.8Z" />
        <path d="M24.58,109.93h2.2a1,1,0,0,0,0-2h-2.2a1,1,0,1,0,0,2Z" />
        <path d="M15.63,108.93a1,1,0,0,0,1,1h2.2a1,1,0,0,0,0-2h-2.2A1,1,0,0,0,15.63,108.93Z" />
        <path d="M17.73,71.08a1,1,0,0,0,1-1v-2.2a1,1,0,0,0-2,0v2.2A1,1,0,0,0,17.73,71.08Z" />
        <path d="M16.73,78a1,1,0,0,0,2,0V75.83a1,1,0,0,0-2,0Z" />
        <path d="M23.81,73a1,1,0,0,0-1-1H20.6a1,1,0,0,0,0,2h2.21A1,1,0,0,0,23.81,73Z" />
        <path d="M12.65,74h2.2a1,1,0,0,0,0-2h-2.2a1,1,0,0,0,0,2Z" />
        <path d="M95.91,95.16a1.28,1.28,0,1,0,1.28-1.28A1.28,1.28,0,0,0,95.91,95.16Z" />
        <path d="M100.45,108.69a1.28,1.28,0,1,0-1.28-1.28A1.28,1.28,0,0,0,100.45,108.69Z" />
        <path d="M59.75,59a1.28,1.28,0,1,0-1.28,1.28A1.28,1.28,0,0,0,59.75,59Z" />
        <path d="M80,110.84a1.28,1.28,0,1,0,1.28-1.28A1.28,1.28,0,0,0,80,110.84Z" />
        <path d="M52.82,14.83a1.28,1.28,0,1,0-1.28,1.28A1.28,1.28,0,0,0,52.82,14.83Z" />
        <path d="M27.77,90.12a1.29,1.29,0,1,0-1.28,1.28A1.28,1.28,0,0,0,27.77,90.12Z" />
        <path d="M98.91,14.83a1.28,1.28,0,1,0-1.28,1.28A1.28,1.28,0,0,0,98.91,14.83Z" />
      </GradeIcon>
      <CounponInfo>
        <CouponTitle className={grade}>{grade} 등급 혜택</CouponTitle>
        <CouponName>객실 5% 할인 쿠폰</CouponName>
        <PublishDate>발행일: 2023-08-01</PublishDate>
        <DateOfUse>사용기한: 2023-08-01~2023-08-31</DateOfUse>
      </CounponInfo>
    </CouponWrapper>
  );
};
export default Coupon;
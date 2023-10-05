import React, { useEffect, useState } from 'react';
import * as S from './Style';
import visual03 from '../../images/main/visual02.webp';
import visual02 from '../../images/main/visual01.webp';
import visual01 from '../../images/main/visual03.webp';

const images = [visual03, visual02, visual01];

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // 5초마다 슬라이드 변경

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트 될 때 인터벌 정리
    };
  }, [currentIndex]);

  return (
    <S.Container>
      <ul className="imgcontainer">
        {images.map((image, index) => (
          <li key={index} data-isactive={index === currentIndex}>
            <img src={image} alt={`Image ${index}`} />
          </li>
        ))}
      </ul>
      <div className="slidetext">
        <h2>THE HOTEL GOORM</h2>
        <p>고객의 작은 관심에도 귀 기울이며, 차별화된 서비스와 시설로써 보다 편안하고 안락한 휴식을 제공합니다.</p>
      </div>
      <button type="button" onClick={goToPreviousSlide} className="slidebtn left">
        <S.SideIcon />
      </button>
      <button type="button" onClick={goToNextSlide} className="slidebtn right">
        <S.SideIcon className="right" />
      </button>
    </S.Container>
  );
};

export default Slide;

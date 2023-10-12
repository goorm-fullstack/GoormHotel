import React, { Component } from 'react';
import imgSpa from '../../images/main/spa.jpg';
import imgPool from '../../images/facilities/pool.jpg';
import imgSalon from '../../images/facilities/salon.jpg';
import * as S from './Style';

const FacilitiesSlider = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: '0px',
  };

  return (
    <div>
      <S.FSlider {...settings}>
        <div>
          <img src={imgSpa} />
        </div>
        <div>
          <img src={imgPool} />
        </div>
        <div>
          <img src={imgSalon} />
        </div>
      </S.FSlider>
    </div>
  );
};

export default FacilitiesSlider;

import React, { useEffect } from 'react';
import { styled } from 'styled-components';

const MapContainer = styled.div`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '480px'};
  border: 1px solid #ddd;
`;

const KakaoMap = ({ width, height }) => {

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.40254481282269, 127.1011263244144), 
        level: 3, // 지도 초기 줌 레벨
      };

      const map = new window.kakao.maps.Map(container, options);
      const markerPosition = new window.kakao.maps.LatLng(37.40254481282269, 127.1011263244144);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    });
  }, []);

  return (
    <MapContainer id="map" width={width} height={height} />
  );
};

export default KakaoMap;
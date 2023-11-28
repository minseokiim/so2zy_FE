import styled from 'styled-components';
import { theme } from '@styles/theme';
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useState } from 'react';
declare global {
  interface Window {
    kakao: any;
  }
}

const MapBox: React.FC = () => {
  const latitude = 33.450701;
  const longitude = 126.570667;
  useEffect(() => {
    const container = document.getElementById(`map`);
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const positions = [
      {
        name: '카카오',
        latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
      },
      {
        name: '생태',
        latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
      },
      {
        name: '텃밭',
        latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
      },
      {
        name: '근린',
        latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
      },
    ];
    for (let i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
      });

      const contentString = ReactDOMServer.renderToString(
        <div
          style={{
            backgroundColor: '#253C59',
            borderRadius: '10px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '40px',
            display: 'flex',
            padding: '.25rem .5rem',
            gap: '0.25rem',
          }}
        >
          <div
            style={{
              paddingTop: '.25rem',
            }}
          >
            {positions[i].name}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              padding: '0 .2rem',
              borderRadius: '.3rem',
              color: 'black',
            }}
          >
            x
          </div>
        </div>,
      );

      const content = document.createElement('div');
      content.innerHTML = contentString;

      // 마커를 중심으로 커스텀 오버레이를 표시하기 위해 CSS를 이용해 위치를 설정합니다
      const overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        map: null,
        position: marker.getPosition(),
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
      });
      const closeBtn = content.querySelector('div:last-child');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          overlay.setMap(null);
        });
      }
    }
  }, [latitude, longitude]);

  return (
    <div id="map" style={{ width: '40vw', height: '50vh', margin: '1rem 0' }} />
  );
};

export default function Map({ closeModal }: { closeModal: () => void }) {
  return (
    <StyledContainer>
      <StyledTitle>위치</StyledTitle>
      <StyledLine />
      <MapBox />
    </StyledContainer>
  );
}
const StyledContainer = styled.div``;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.4rem;
`;

const StyledLine = styled.hr`
  color: ${theme.colors.gray3};
  margin: 1rem 0;
`;

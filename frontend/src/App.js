import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Terms from './pages/Terms';
import Room from './pages/Room';
import Dining from './pages/Dining';
import { styled } from 'styled-components';
import About from './pages/About';
import Map from './pages/Map';
import Mypage from './pages/Mypage';
import ReservationPage from './pages/ReservationPage';
import { useEffect, useRef, useState } from 'react';
import ChatModal from './components/ChatModal';

const AppContainer = styled.div`
  width: 100%;
  min-width: 100%;
  min-height: 100vh;
`;

const FloatingButtons = styled.div`
  position: sticky;
  bottom: 70px;
  float: right;
  right: 100px;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const ChatButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #F5F5F5;
  box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.15);
  margin-bottom: 10px; 

  svg {
    width: 22px;
    height: 18px;
  } 
`;

const ScrollToTopButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #21201E;

  svg {
    fill: white;
    width: 20px;
    height: 20px;
  }
`;

function App() {
  const [showChat, setShowChat] = useState(false);
  
  const openChat = () => {
    setShowChat(!showChat); 
  };

  const closeChat = () => {
    setShowChat(false); 
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <BrowserRouter>
    <AppContainer>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/rooms" element={<Room />}></Route>
        <Route path="/dining" element={<Dining />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/reservation" element={<ReservationPage />}></Route>
      </Routes>
      </AppContainer>
      <FloatingButtons>
        <ChatButton onClick={openChat}><svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M208 0C322.9 0 416 78.8 416 176C416 273.2 322.9 352 208 352C189.3 352 171.2 349.7 153.9 345.8C123.3 364.8 79.13 384 24.95 384C14.97 384 5.93 378.1 2.018 368.9C-1.896 359.7-.0074 349.1 6.739 341.9C7.26 341.5 29.38 317.4 45.73 285.9C17.18 255.8 0 217.6 0 176C0 78.8 93.13 0 208 0zM164.6 298.1C179.2 302.3 193.8 304 208 304C296.2 304 368 246.6 368 176C368 105.4 296.2 48 208 48C119.8 48 48 105.4 48 176C48 211.2 65.71 237.2 80.57 252.9L104.1 277.8L88.31 308.1C84.74 314.1 80.73 321.9 76.55 328.5C94.26 323.4 111.7 315.5 128.7 304.1L145.4 294.6L164.6 298.1zM441.6 128.2C552 132.4 640 209.5 640 304C640 345.6 622.8 383.8 594.3 413.9C610.6 445.4 632.7 469.5 633.3 469.9C640 477.1 641.9 487.7 637.1 496.9C634.1 506.1 625 512 615 512C560.9 512 516.7 492.8 486.1 473.8C468.8 477.7 450.7 480 432 480C350 480 279.1 439.8 245.2 381.5C262.5 379.2 279.1 375.3 294.9 369.9C322.9 407.1 373.9 432 432 432C446.2 432 460.8 430.3 475.4 426.1L494.6 422.6L511.3 432.1C528.3 443.5 545.7 451.4 563.5 456.5C559.3 449.9 555.3 442.1 551.7 436.1L535.9 405.8L559.4 380.9C574.3 365.3 592 339.2 592 304C592 237.7 528.7 183.1 447.1 176.6L448 176C448 159.5 445.8 143.5 441.6 128.2H441.6z"/></svg></ChatButton>
        <ScrollToTopButton onClick={scrollToTop}><svg viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" transform="rotate(-90 16 16)"/></g></svg></ScrollToTopButton>
      </FloatingButtons>
      {showChat && ( 
          <ChatModal closeChat={closeChat} />
        )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

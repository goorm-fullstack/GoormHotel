import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import Room from './pages/about/Room';
import Dining from './pages/about/Dining';
import About from './pages/about/About';
import Mypage from './pages/member/Mypage';
import ReservationPage from './pages/reservation/ReservationPage';
import ChatModal from './components/layout/ChatModal/ChatModal';
import ReservationCheck from './pages/reservation/ReservationCheck';
import ReservationItem from './pages/reservation/ReservationItem';
import ReservationList from './pages/reservation/ReservationList';
import Agreement from './pages/agreement/Agreement';
import Sitemap from './pages/about/Sitemap';
import FindAccount from './pages/member/FindAccount';
import FindIdResult from './pages/member/FindIdResult';
import FindPwResult from './pages/member/FindPwResult';
import Membership from './pages/about/Membership';
import Way from './pages/about/Location';
import Privacy from './pages/agreement/Privacy';
import ScrollToTop from './components/layout/ScrollTop';
import Facilities from './pages/about/Facilities';
import CustomerSupport from './pages/board/BoardList';
import Login from './pages/member/Login';
import Signup from './pages/member/Signup';
import BoardWrite from './pages/board/BoardWrite';
import BoardRead from './pages/board/BoardRead';
import JoinComplete from './pages/member/JoinComplete';
import AdminLogin from './admin/AdminLogin';
import AdminMember from './admin/member/AdminMember';
import AdminMemberDetail from './admin/member/AdminMemberDetail';
import AdminManager from './admin/member/AdminManager';
import AdminComment from './admin/board/AdminComment';
import AdminReport from './admin/board/AdminReport';
import AdminReservation from './admin/reservation/AdminReservation';
import AdminReservationDetail from './admin/reservation/AdminReservationDetail';
import AdminGiftCard from './admin/item/AdminGiftCard';
import AdminDetailGiftCard from './admin/item/AdminDetailGiftCard';
import AdminItemList from './admin/item/AdminItemList';
import AdminWriteFormRoom from './admin/item/AdminWriteFormRoom';
import AdminWriteFormDining from './admin/item/AdminWriteFormDining';
import AdminDetailDining from './admin/item/AdminDetailDining';
import AdminDetailRoom from './admin/item/AdminDetailRoom';
import AdminBoard from './admin/board/AdminBoard';
import AdminBoardWrite from './admin/board/AdminBoardWrite';
import AdminDeleteComment from './admin/board/AdminDeleteComment';
import AdminChat from './admin/chat/AdminChat';
import AdminChatDetail from './admin/chat/AdminChatDetail';
import AdminMail from './admin/chat/AdminMail';
import AdminIndex from './admin/AdminIndex';
import AdminSubScribe from './admin/chat/AdminSubScribe';

const AppContainer = styled.div`
  width: 100%;
  min-height: 60vh;
`;

const FloatingWrapper = styled.div`
  position: fixed;
  top: 81vh;
  bottom: 40px;
  right: 40px;
  z-index: 99;

  button {
    display: block;
  }
`;

const FloatingBtn = styled.button<{$show: boolean}>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.charcoal};
  transition: transform 0.2s;

  svg {
    fill: white;
    width: 20px;
    height: 20px;
  }

  &.chatBtn {
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
  }

  &.chatBtn svg {
    fill: ${(props) => props.theme.colors.charcoal};
    width: 22px;
    height: 18px;
  }

  &:hover {
    transform: scale(1.1);
  }

  &.scrolltop {
    display: ${(props) => (props.$show ? 'block' : 'none')};
  }
`;

function App() {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState<boolean>(false);
  const [isAdminPage, setIsAdminPage] = useState<boolean>(false);
  const location = useLocation();

  const openChat = () => {
    setShowChat(!showChat);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 상단에 있는지 확인하여 상태를 업데이트
      setShowFloatingButtons(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const path: string = location.pathname;
    const isAdmin: boolean = path.includes('/admin') ? true : false;
    setIsAdminPage(isAdmin);
  }, [location.pathname]);

  if (isAdminPage) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/reservation/:page" element={<AdminReservation />} />
          <Route path="/admin/reservation/detail/:reservationNumber" element={<AdminReservationDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/member/:page" element={<AdminMember />} />
          <Route path="/admin/member/detail/:memberId" element={<AdminMemberDetail />} />
          <Route path="/admin/managers/:page" element={<AdminManager />} />
          <Route path="/admin/comments/:page" element={<AdminComment />} />
          <Route path="/admin/report/:page" element={<AdminReport />} />
          <Route path="/admin/item/:page" element={<AdminItemList />} />
          <Route path="/admin/item/detail/dining/:type/:name" element={<AdminDetailDining />} />
          <Route path="/admin/item/detail/room/:type/:name" element={<AdminDetailRoom />} />
          <Route path="/admin/item/add/room" element={<AdminWriteFormRoom />} />
          <Route path="/admin/item/add/dining" element={<AdminWriteFormDining />} />
          <Route path="/admin/giftcard/:page" element={<AdminGiftCard />} />
          <Route path="/admin/giftcard/detail/:id" element={<AdminDetailGiftCard />} />
          <Route path="/admin/board/:page" element={<AdminBoard />} />
          <Route path="/admin/board/write" element={<AdminBoardWrite />} />
          <Route path="/admin/deletepost/:page" element={<AdminDeleteComment />} />
          <Route path="/admin/chat/:page" element={<AdminChat />} />
          <Route path="/admin/chat/detail/:roomId" element={<AdminChatDetail />} />
          <Route path="/admin/mail" element={<AdminMail />} />
          <Route path="/admin/mail/:receiver" element={<AdminMail />} />
          <Route path="/admin/subscriber/:page" element={<AdminSubScribe />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <ScrollToTop />
        <Header />
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminIndex />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/about" element={<About />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/offers/step2" element={<ReservationPage />} />
            <Route path="/location" element={<Way />} />
            <Route path="/agreement" element={<Agreement />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/findidpw" element={<FindAccount />} />
            <Route path="/findid/result" element={<FindIdResult />} />
            <Route path="/findpw/result" element={<FindPwResult />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/reservation/:number" element={<ReservationCheck />} />
            <Route path="/offers/:page" element={<ReservationItem />} />
            <Route path="/myhistory/:page" element={<ReservationList />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/result" element={<JoinComplete />} />
            <Route path="/board/:board/:page" element={<CustomerSupport />} />
            <Route path="/board/:board/write" element={<BoardWrite />} />
            <Route path="/board/:board/detail/:title" element={<BoardRead />} />
          </Routes>
        </AppContainer>
        <FloatingWrapper>
          <FloatingBtn className="chatBtn" onClick={openChat} $show={showFloatingButtons}>
            <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M208 0C322.9 0 416 78.8 416 176C416 273.2 322.9 352 208 352C189.3 352 171.2 349.7 153.9 345.8C123.3 364.8 79.13 384 24.95 384C14.97 384 5.93 378.1 2.018 368.9C-1.896 359.7-.0074 349.1 6.739 341.9C7.26 341.5 29.38 317.4 45.73 285.9C17.18 255.8 0 217.6 0 176C0 78.8 93.13 0 208 0zM164.6 298.1C179.2 302.3 193.8 304 208 304C296.2 304 368 246.6 368 176C368 105.4 296.2 48 208 48C119.8 48 48 105.4 48 176C48 211.2 65.71 237.2 80.57 252.9L104.1 277.8L88.31 308.1C84.74 314.1 80.73 321.9 76.55 328.5C94.26 323.4 111.7 315.5 128.7 304.1L145.4 294.6L164.6 298.1zM441.6 128.2C552 132.4 640 209.5 640 304C640 345.6 622.8 383.8 594.3 413.9C610.6 445.4 632.7 469.5 633.3 469.9C640 477.1 641.9 487.7 637.1 496.9C634.1 506.1 625 512 615 512C560.9 512 516.7 492.8 486.1 473.8C468.8 477.7 450.7 480 432 480C350 480 279.1 439.8 245.2 381.5C262.5 379.2 279.1 375.3 294.9 369.9C322.9 407.1 373.9 432 432 432C446.2 432 460.8 430.3 475.4 426.1L494.6 422.6L511.3 432.1C528.3 443.5 545.7 451.4 563.5 456.5C559.3 449.9 555.3 442.1 551.7 436.1L535.9 405.8L559.4 380.9C574.3 365.3 592 339.2 592 304C592 237.7 528.7 183.1 447.1 176.6L448 176C448 159.5 445.8 143.5 441.6 128.2H441.6z" />
            </svg>
          </FloatingBtn>
          <FloatingBtn className="scrolltop" onClick={scrollToTop} $show={showFloatingButtons}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <g data-name="Layer 2" id="Layer_2">
                <path
                  d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z"
                  transform="rotate(-90 16 16)"
                />
              </g>
            </svg>
          </FloatingBtn>
        </FloatingWrapper>
        {showChat && <ChatModal closeChat={closeChat} />}
        <Footer />
      </>
    );
  }
}

export default App;
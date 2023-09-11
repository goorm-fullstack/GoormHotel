import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reservation from './reservation/reservation';
import ReservationDetail from './reservation/reservationDetail';

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/admin/reservation" element={<Reservation />}></Route>
          <Route path="/admin/reservation/detail" element={<ReservationDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
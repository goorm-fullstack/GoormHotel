import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Terms from './pages/Terms';
import Way from './pages/way/Way';
import Agreement from './pages/register/Agreement';
import Privacy from './pages/register/Privacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/location" element={<Way />}></Route>
        <Route path="/agreement" element={<Agreement />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Terms from './pages/Terms';
import Way from './pages/way/Way';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/location" element={<Way />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

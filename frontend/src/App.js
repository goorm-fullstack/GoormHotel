import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Terms from './pages/Terms';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

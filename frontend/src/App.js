import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sitemap from "./pages/Sitemap";
import FindAccount from "./pages/FindAccount";
import FindIdResult from "./pages/FindIdResult";
import FindPwResult from "./pages/FindPwResult";
import Membership from "./pages/Membership";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sitemap" element={<Sitemap />}></Route>
        <Route path="/findAccount" element={<FindAccount />}></Route>
        <Route path="/findIdResult" element={<FindIdResult />}></Route>
        <Route path="/findPwResult" element={<FindPwResult />}></Route>
        <Route path="/membership" element={<Membership />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

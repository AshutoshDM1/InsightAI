import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import SignUp from "./pages/SignUp";
import Deshboard from "./pages/Deshboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Analytics />
      <ToastContainer />
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/ai" element={<Deshboard />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;

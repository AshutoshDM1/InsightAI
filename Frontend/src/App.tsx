import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import SignUp from "./pages/SignUp";
import Deshboard from "./pages/Deshboard";

function App() {
  return (
    <>
      <Analytics />
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp/>} />
            <Route path="/ai" element={<Deshboard/>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;

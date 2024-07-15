import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Analytics />
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp/>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import SignUp from "./pages/Landing";
import Deshboard from "./pages/Deshboard";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Analytics />
      <Toaster theme="dark" />
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

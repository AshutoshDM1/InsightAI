import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import Dashboard from "./pages/Dashboard/Deshboard";
import { Toaster } from "sonner";
import LandingPage from "./pages/Landing/Landing";

function App() {
  return (
    <>
      <Analytics />
      <Toaster theme="dark" />
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ai" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;

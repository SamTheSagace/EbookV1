import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import Home from "./pages/Home/Home";

function App() {

  return (
    <>
    <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/EbookV1/'}
    >
    <Routes>
    <Route index element={<Home />} />
    <Route path="*" element={<div> 404</div>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

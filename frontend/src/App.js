import React from "react";
import { styled } from 'styled-components';
import Card from "./components/Card";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Wrapper>
      <BrowserRouter>

      <Routes>
        <Route path="/" element={ <Card /> } />
        <Route path="/home" element={ <HomePage /> } />
      </Routes>

      </BrowserRouter>
      <ToastContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background-image: url("${process.env.PUBLIC_URL}/bg-img.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;

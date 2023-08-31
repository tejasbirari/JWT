import React from 'react';
import {styled} from 'styled-components';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>

      <Navbar />

      <Container onClick={ () => navigate('/products') }>

        Go to products...

      </Container>

    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #fff;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  cursor: pointer;

  &:hover{
    color: purple;
  }
`;

export default HomePage
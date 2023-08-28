import React, { useState } from 'react';
import { styled } from 'styled-components';
import LoginCard from './LoginCard';
import SignUpCard from './SignUpCard';

const Card = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [isLoginData, setIsLoginData] = useState({ email: "", password: "" });

  return (
    <Wrapper>
        <Container>
            
            { isLogin ? (
                <LoginCard setIsLogin={setIsLogin} isLoginData={isLoginData}  />
            ) : (
                <SignUpCard setIsLogin={setIsLogin} setIsLoginData={setIsLoginData} />
            )}

        </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    min-height: 85vh;
    width: 55vh;
    background: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 420px){
        width: 45vh;
    }
`;

const Container = styled.form`
    min-height: 80vh;
    width: 45vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 420px){
        width: 35vh;
    }
`; 





export default Card
import { Lock, User } from "lucide-react";
import React, { useState } from "react";
import { styled } from "styled-components";
import { authentication } from "../services/postMethods";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastError, toastSuccess } from "../services/toast/toastConfig";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';


const LoginCard = ({setIsLogin, isLoginData}) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState(isLoginData.email);
  const [password, setPassword] = useState(isLoginData.password);

  const responseMessage = (credentialResponse) => {
    console.log(credentialResponse);
    if(credentialResponse){
      const token = credentialResponse.credential;
      localStorage.setItem("TOKEN", token);
      toast.success("Login successful", toastSuccess);
      navigate('/home');
    }
  }

  const errorMessage = (credentialResponse) => {
    console.log("Login Faild");
  }

  const handleLogin = async() => {
    if(!email || !password){
      toast.error("Fill Required Details", toastError);
      return;
    }
    const responseStatus = await authentication(email, password);
    if(responseStatus === 200){
      toast.success("Login successful", toastSuccess);
      navigate('/home');
    } else if(responseStatus === 404) {
      toast.error("User does not exist", toastError);
    } else if(responseStatus === 401) {
      toast.error("Invalid password", toastError);
    } else {
      toast.error("Try again later", toastError);
    }
  }

  return (
    <>
      <Header>Login</Header>

      <Group>
        <Label>Email</Label>
        <InputField>
          <User color="gray" />
          <Input type="text" placeholder="Type your email"
            value={email} onChange={ (e) => setEmail(e.target.value) } 
          ></Input>
        </InputField>
      </Group>

      <Group>
        <Label>Password</Label>
        <InputField>
          <Lock color="gray" />
          <Input type="password" placeholder="Type your password"
            value={password} onChange={ (e) => setPassword(e.target.value) } 
          ></Input>
        </InputField>
      </Group>

      <StyledLink>Forgot password?</StyledLink>

      <Button onClick={ handleLogin }>login</Button>

      <SignUpText>Or Sign Up Using</SignUpText>

      <Oauth>

        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
          theme="outline"
          shape="circle"
          type="icon"
        />

      </Oauth>

      <SignUpText>Or Sign Up Using</SignUpText>

      <SignupLink onClick={ () => setIsLogin(false) } >sign up</SignupLink>
    </>
  );
};

const Header = styled.p`
  font-size: 30px;
  font-weight: 600;
  padding: 25px 0 50px 0;
`;

const Group = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Input = styled.input`
  padding: 12px 20px;
  width: 100%;
  outline: none;
  border: none;
`;

const StyledLink = styled.div`
  font-size: 14px;
  color: gray;
  text-align: right;
  margin-right: -26vh;

  @media screen and (max-width: 420px) {
    margin-right: -18vh;
  }
`;

const Button = styled.div`
  text-transform: uppercase;
  border: 1px solid transparent;
  width: 100%;
  text-align: center;
  padding: 7px 0;
  margin: 25px 0 50px 0;
  font-size: 15px;
  font-weight: 600;
  border-radius: 100px;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(
    13deg,
    rgba(180, 58, 147, 1) 0%,
    rgba(153, 29, 253, 1) 50%,
    rgba(69, 119, 252, 1) 100%
  );

  &:hover {
    transform: scale(0.95);
  }

  &:active {
    transform: scale(0.98);
  }

  @media screen and (max-width: 420px) {
    margin: 25px 0 20px 0;
  }
`;

const SignUpText = styled.div`
  color: gray;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Oauth = styled.div`
  padding: 10px 0 80px 0;
`;

const SignupLink = styled.div`
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
`;

export default LoginCard;

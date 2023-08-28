import { Eye, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { styled } from "styled-components";
import { registration } from "../services/postMethods";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastError, toastInfo, toastSuccess } from "../services/toast/toastConfig";

const SignUpCard = ({setIsLogin, setIsLoginData}) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [displayPassError, setDisplayPassError] = useState(false);

    const handleSignup = async() => {

      // Frontend Validation 
      if(!userName || !email || !password || !confirmPass){
        toast.info("Fill Required Details", toastInfo);
        return;
      }

      const emailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if(!emailformat.test(email)){
        toast.info("Invalid email address", toastInfo);
        return;
      }

      if(password.length < 8){
        setDisplayPassError(true);
        return;
      }
      
      if(password !== confirmPass){
        toast.info("Passwords Don't Match", toastInfo);
        return;
      }

      const responseStatus = await registration(userName, email, password);
      if(responseStatus === 201){
        toast.success("Account Created", toastSuccess);
        setIsLoginData({email, password});
        setIsLogin(true);
      } else {
        toast.error("Oops, Something Went Wrong", toastError);
      }
    }

  return (
    <>
      <Header>SignUp</Header>

      <Group>
        <Label>Username</Label>
        <InputField>
          <User color="gray" />
          <Input type="text" placeholder="Type your username"
            value={userName} onChange={ (e) => setUserName(e.target.value)} 
          ></Input>
        </InputField>
      </Group>

      <Group>
        <Label>Email</Label>
        <InputField>
          <Mail color="gray" />
          <Input type="email" placeholder="Type your email"
            value={email} onChange={ (e) => setEmail(e.target.value)} 
          ></Input>
        </InputField>
      </Group>

      <Group>
        <Label>Password</Label>
        <InputField>
          <Lock color="gray" />
          <Input type="password" placeholder="Type your password"
            value={password} onChange={ (e) => setPassword(e.target.value)} 
          ></Input>
        </InputField>
        { displayPassError ? <Span>Password must be greater than 8 characters</Span> : null}
      </Group>

      <Group>
        <Label>Confirm Password</Label>
        <InputField>
          <Eye color="gray" />
          <Input type="text" placeholder="Confirm password"
            value={confirmPass} onChange={ (e) => setConfirmPass(e.target.value)} 
          ></Input>
        </InputField>
      </Group>

      <Button onClick={ handleSignup }>signup</Button>

      <LoginText>Already have an account?</LoginText>

      <LoginLink onClick={ () => setIsLogin(true) }>login</LoginLink>
    </>
  );
};

const Header = styled.p`
  font-size: 30px;
  font-weight: 600;
  padding: 25px 0 40px 0;
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
  padding: 10px 20px;
  width: 100%;
  outline: none;
  border: none;
`;

const Span = styled.span`
  font-size: 13px;
  color: red;
`;

const Button = styled.div`
  text-transform: uppercase;
  border: 1px solid transparent;
  width: 100%;
  text-align: center;
  padding: 7px 0;
  margin: 25px 0 90px 0;
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
    margin: 25px 0 40px 0;
  }
`;

const LoginText = styled.div`
  color: gray;
  font-size: 14px;
  margin-bottom: 10px;
`;

const LoginLink = styled.div`
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0 0 10px 0;
`;

export default SignUpCard;

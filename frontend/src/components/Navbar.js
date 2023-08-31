import { Bell } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {styled} from 'styled-components';

const Navbar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('TOKEN');
        navigate('/');
    }

  return (
    <Wrapper>

        <Logo>JWT</Logo>

        <Row>
            <Bell style={{ cursor: "pointer" }} />
            <Text>Account</Text>
            <Logout onClick={ handleLogout }>Logout</Logout>
        </Row>

    </Wrapper>
  )
}

const Wrapper = styled.div`
    height: 9vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    box-shadow: 0px 1px;
`;

const Logo = styled.div`
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
`;

const Text = styled.div`
    font-weight: 500;
    cursor: pointer;
`;

const Logout = styled.div`
    color: red;
    font-weight: 500;
    cursor: pointer;
`;

export default Navbar
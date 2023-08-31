import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import { getProducts } from '../services/postMethods';

const Products = () => {

  const [response, setResponse] = useState('');

  useEffect(() => {
    const message = async() => {
      const res = await getProducts();
      setResponse(res);
    }
    message();
  }, [])
  


  return (
    <Wrapper>
      Products
      <div>{response}</div>
    </Wrapper>

    
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #fff;
`;

export default Products
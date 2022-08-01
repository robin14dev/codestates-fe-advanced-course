import React from 'react';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import styled from 'styled-components';


const Wrapper = styled.div`
position: fixed;
bottom: 1.8rem;
right: 1.8rem;
`

const onClickToTop = () => {
  window.scrollTo({top : 0, behavior:'smooth'})
}

const Footer = () => {
  return (
    <Wrapper>
      <button onClick={onClickToTop}><BsFillArrowUpCircleFill size={40} color={'navy'}  /></button>
    </Wrapper>
  );
};

export default Footer;
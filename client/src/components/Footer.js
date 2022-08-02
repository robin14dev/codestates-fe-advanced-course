import React from 'react';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import styled from 'styled-components';


const Wrapper = styled.div`
position: fixed;
bottom: 1.8rem;
right: 1.8rem;
@media  (max-width : 425px){
bottom: 6rem;
right: 0.5rem;

}
@media  (max-width : 375px){
display: none;

}

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
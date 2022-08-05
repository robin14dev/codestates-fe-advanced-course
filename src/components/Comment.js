import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`

/* background-color: beige; */
border-bottom: 0.1rem lightgray solid;
padding: 1rem 0 ;
&>h4{
  margin-bottom: 0.5rem;

 
}

@media (max-width:375px) {
  padding: 1.2rem 0 0.8rem 0;
    & > h4 {
      font-size: 0.95rem;
    }

    & > p {
      font-size: 1.1rem;
    }
  }

  @media (max-width : 320px) {

    & > p {
      font-size: 1rem;
    }
    
  }
`

const Comment = ({comment}) => {
  const {name,body} = comment
  return (
    <Wrapper>
      <h4>{name}</h4>
      <p> {body}</p> 
    </Wrapper>
  );
};

export default Comment;
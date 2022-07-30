import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`

/* background-color: beige; */
border-bottom: 0.1rem lightgray solid;
padding: 1rem 0 ;
&>h4{
  margin-bottom: 0.5rem;
}
`

const Comment = ({comment}) => {
  const {id, postId, name, email, body} = comment
  return (
    <Wrapper>
      <h4>{name}</h4>
      <p> {body}</p> 
    </Wrapper>
  );
};

export default Comment;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {useLocation} from "react-router-dom"
import Comment from './Comment';

const Wrapper = styled.div`
width: 60vw;
margin: 2rem auto;
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: space-evenly;
/* background-color: aqua; */
border-radius: 1rem;
box-shadow: 0.01rem 0.1rem 0.1rem 0.1rem lightgrey;
`

const Header =styled.div`
display: flex;
flex-direction: column;
/* background-color: yellow; */
padding: 1rem;
&>div{
  align-self: flex-start;
  font-weight: bold;
  margin-top: 1.5rem;
}
`

const Body = styled.div`
/* background-color: yellowgreen; */
padding: 3rem 1rem;


`
const Footer = styled.div`
/* background-color: skyblue; */
padding: 1rem;
&>h3{
  border-top: 0.1rem solid lightgray;
  padding-top: 3rem;
  /* border-top: 0.1rem solid lightgray; */
 
}
`
const Post = () => {
  const {state} = useLocation()
  console.log(state);
  const {title, body, id, userId} = state;

  const [comments, setComments] = useState([])

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}/comments`)
    .then(response => {
      console.log(response);
      setComments(response.data)
    })
  }, [])
  // const {id,title, body, userId} = post
  return (
   
     <Wrapper>
     <Header>
       <h1>{title}</h1>
       <div>작성자 : {userId}</div>
     </Header>
     <Body>
       <p>{body}</p>
     </Body>
     <Footer>
       <h3>댓글 {comments.length} &gt; </h3>
       {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
     </Footer>
     </Wrapper>
   
  );
};

export default Post;
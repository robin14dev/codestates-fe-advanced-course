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

@media (max-width: 768px) {
  margin: 0 auto;
  width: 100vw;
  border-radius: 0;
  
}
`

const Header =styled.div`
display: flex;
flex-direction: column;
padding: 1rem;
&>div{
  align-self: flex-start;
  font-weight: bold;
  margin-top: 1.5rem;
}

@media (max-width : 375px) {

  margin-top: 1rem;

  & > div {
  margin-top  :1rem ;
  font-weight: 400;
  font-size: 0.9rem;
  }

  & > h1 {
  font-size: 1.5rem;
  }
} 



@media (max-width: 320px) {
  & > h1 {
  font-size: 1.3rem;
  }
  
}



`

const Body = styled.div`
padding: 3rem 1rem;

@media (max-width: 768px) {
 padding: 2rem 1rem;
}
@media (max-width: 425px) {
 padding: 0 1rem;
  font-size: 1.2rem;
}

@media (max-width: 320px) {
 & > p {
  font-size: 1rem;
 }
}


`
const Footer = styled.div`
/* background-color: skyblue; */
padding: 1rem;
&>h3{
  border-top: 0.1rem solid lightgray;
  padding-top: 2rem;
}

@media (max-width: 768px) {
  
  & > h3 {font-size: 1.2rem;
    padding-top: 2rem;

  }
  
}
@media (max-width: 375px) {
  & > h3 {
  font-size: 0.9rem;
  padding: 1rem 0 0.3rem 0;
  }
  
}

@media (max-width: 320px) {
  & > h3 {
  font-size: 0.8rem;
  padding: 1rem 0 0.3rem 0;
  }
  
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
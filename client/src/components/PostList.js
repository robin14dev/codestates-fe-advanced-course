import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import Pagination from "./Pagination";



const Wrapper = styled.div`
margin: 0 auto;
padding: 1rem;
width: 50vw;
height: 80vh;
display: flex;
flex-direction: column;
justify-content: space-between;

border-radius: 1rem;
overflow: scroll;
box-shadow: 0.01rem 0.1rem 0.1rem 0.1rem lightgrey;
`

const Post = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 10%;
padding: 0.5rem;
border-bottom: 0.1rem lightgray solid;
cursor: pointer;
transition: all 0.2s;

&:hover {
  background-color: #f1efefa8;
}

&>div:nth-child(1){
  /* background-color: yellow; */
  width: 80%;
  overflow: hidden;
white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.5rem;
  font-weight: bold;
 &:hover{
  color: navy;
 }

}
`

const Nav = styled.div`
align-self: center;
margin-top: 2rem;
`

const Button = styled.button`
margin: 0.3rem;
width: 2rem;
height: 2rem;
font-size: 1rem;
font-weight: 500;
transition: all 0.2s;
/* background-color: yellow; */
border-radius: 0.5rem;

&:hover {
  background-color: lightgray;
  width: 2rem;
  height: 2rem;
}

&[aria-current] {
  background-color: #6060d7;
  color: white;
}

&[disabled] {
  background-color: #f0ecec;
  cursor: revert;
}
`
const ArrowBtn = styled(Button)`
border: 1px solid lightgray;
`

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0)

  const pageLength = Math.ceil(posts.length / 10) // 10

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    .then(response => {
      console.log(response);
      setPosts(response.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  const navigate = useNavigate()

  const goToPost = (post) => {
    navigate(`/posts/${post.id}`, {state : post})
  }

  const showingPage = (idx) => {
    console.log(idx);
    setOffset(10 * (idx-1))
    }
  const showingArrow = (e) => {
    console.log(e.target.textContent);
    if(e.target.textContent === '>') {
      if(offset >= posts.length - 10 ) {
        return
      } else {
        const curOffset = offset
        setOffset(curOffset+10)  
      }
    } else {
      if(offset < 10 ) {
        return
      } else {
        const curOffset = offset
        setOffset(curOffset-10)  
      }
    }
  }

  // 1, offset : 0: 0~9 
  // 2, offset : 10, 10~19 
  // 3, offset : 20, 20~29 
  return (
    <Wrapper>
      {posts.slice(offset, offset+10).map(post => 
          <Post key={post.id} post={post} onClick={()=>goToPost(post)} >
            <div>{post.title}</div>
            <div>작성자 {post.userId}</div>
          </Post>)}

          <Nav>
            <ArrowBtn disabled={offset === 0 ? true : false} onClick={showingArrow}>&lt;</ArrowBtn>
      {Array(pageLength).fill().map((page,idx) => <Button key={idx} aria-current={offset/10 === idx? true : null} onClick={()=>showingPage(idx+1)}>{idx+1}</Button>)}
            <ArrowBtn disabled={offset >= posts.length - 10 } onClick={showingArrow}>&gt;</ArrowBtn>
        </Nav>
    </Wrapper>
  )
};

export default PostList;
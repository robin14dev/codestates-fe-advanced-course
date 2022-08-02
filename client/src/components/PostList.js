import React, {useState } from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom"



const Wrapper = styled.div`
margin: 0 auto;
padding: 1rem;
width: 70vw;
display: flex;
flex-direction: column;
justify-content: space-between;
border-top: none;
border-radius: 0 0 1rem 1rem;
overflow: scroll;
/* box-shadow: 0.01rem 0.1rem 0.1rem 0.1rem lightgrey; */
`

const Post = styled.div`
display: flex;
flex-direction: column;
/* justify-content: space-between; */
align-items: flex-start;
height: 10%;
padding: 0.5rem;
border-bottom: 0.1rem lightgray solid;
cursor: pointer;
transition: all 0.2s;

&:hover {
  background-color: #f1efefa8;
  &>div:nth-child(1) {
    color: navy;
  }
}

&>div {
  margin: 1rem 0 ;
}


`
const Title = styled.div`
   width: 80%;
  overflow: hidden;
white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.5rem;
  font-weight: bold;
`

const Body = styled.div`
 display: -webkit-box;
white-space: normal;
line-height: 1.2rem;
overflow: hidden;
text-overflow : ellipsis;
width: 100%;
-webkit-line-clamp : 2; 
-webkit-box-orient: vertical;
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
border-radius: 0.5rem;
background-color: ${props => props.offset/10 === props.idx ? ' #6060d7' : 'none'} ;
color: ${props => props.offset/10 === props.idx ? ' white' : 'black'} ;
&:hover {
  background-color: ${props => props.offset/10 === props.idx ? ' #4545cb' : 'lightgray'};
  width: 2rem;
  height: 2rem;
}
/* &[autoFocus] {
  background-color: #6060d7;
  color: white;
} */

&[disabled] {
  background-color: #f0ecec;
  cursor: revert;
}
`
const ArrowBtn = styled(Button)`
border: 1px solid lightgray;
`

const PostList = ({posts, pageLength, searchText}) => {
  const [offset, setOffset] = useState(0);
 

  const navigate = useNavigate()

  const goToPost = (post) => {
    navigate(`/posts/${post.id}`, {state : post})
  }

  const showingPage = (idx) => {
    // console.log(idx);
    setOffset(10 * (idx-1))
    window.scrollTo({top:0, behavior:'smooth'})
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
    window.scrollTo({top:0, behavior:'smooth'})
  }



  const textHighlight = (title, searchText)=>{
    if(searchText !== '' && title.toLowerCase().includes(searchText.toLowerCase())) {
      let splitedArr = title.split(new RegExp(`(${searchText})`, 'gi'))
      return (
        <>
        { splitedArr.map((ele,idx) => 
        ele.toLowerCase() === searchText.toLowerCase() ? <mark key={idx}>{ele}</mark>   : ele
        
      )}
        
        </>
      )
  }
     
    return title
  }

  console.log(posts);
  return (
   
    <Wrapper>
      {posts.length === 0 ?
        <div>검색 결과가 없습니다.</div>
       
      :
        
        posts.slice(offset, offset+10).map(post =>
            <Post key={post.id} post={post} onClick={()=>goToPost(post)} >
              <Title>{textHighlight(post.title, searchText)}</Title>
              <Body>{textHighlight(post.body, searchText)}</Body>
              <div>작성자 {post.userId}</div>
            </Post>)
            
    }

          <Nav>
            <ArrowBtn disabled={offset === 0 ? true : false} onClick={showingArrow}>&lt;</ArrowBtn>
            {Array(pageLength).fill().map((page,idx) => <Button key={idx} offset={offset} idx={idx}  onClick={()=>showingPage(idx+1)}>{idx+1}</Button>)}
            <ArrowBtn disabled={offset >= posts.length - 10 } onClick={showingArrow}>&gt;</ArrowBtn>
          </Nav>
    </Wrapper>
  )
};

export default PostList;
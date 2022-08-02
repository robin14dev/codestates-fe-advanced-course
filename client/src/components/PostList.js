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

@media (max-width : 425px) {
  width: 85vw;
}
@media (max-width : 375px) {
  width: 100vw;
}
`

const Post = styled.div`
display: flex;
flex-direction: column;
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

@media  (max-width : 768px){
  &>div{
    margin: 0.5rem 0;
  }
  
}

@media  (max-width : 375px){
  padding : 0.5rem 0;
   &>div {
    padding: 0.2rem;
    margin: 0;

   }

}


`
const Title = styled.div`
   width: 80%;
  overflow: hidden;
white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.5rem;
  font-weight: bold;
  @media  (max-width : 768px){
    font-size: 1.2rem;

}

@media  (max-width : 375px){
  font-weight: 550;
  font-size: 1rem;
  white-space: normal;
  display: -webkit-box;
  width: 100%;
  -webkit-line-clamp : 3;
  hyphens: auto;
  -webkit-box-orient: vertical;


}


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

@media  (max-width : 375px){
  display: none;
}

`
const User = styled.div`
color: gray;
 @media  (max-width : 768px){
    font-size: 0.8rem;

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
border-radius: 0.5rem;
background-color: ${props => props.offset/10 === props.value -1? ' #6060d7' : 'none'} ;
color: ${props => props.offset/10 === props.value -1 ? ' white' : 'black'} ;
&:hover {
  background-color: ${props => props.offset/10 === props.value - 1   ? ' #4545cb' : 'lightgray'};
  
}

&[disabled] {
  background-color: #f0ecec;
  cursor: revert;
}

@media  (max-width : 760px){
  display: none;
}

@media  (max-width : 375px){

}
@media  (max-width : 320px){
margin: 0.3rem;
width: 1.8rem;
height: 1.8rem;
font-size: 0.9rem;
font-weight: 500;
border-radius: 0.5rem;

}
`
const ResponsiveBtn = styled(Button)`
display: none;
background-color: ${props => props.offset/10 === props.value -1 ? ' #6060d7' : 'none'} ;
color: ${props => props.offset/10 === props.value - 1 ? ' white' : 'black'} ;
&:hover {
  background-color: ${props => props.offset/10 === props.value - 1 ? ' #4545cb' : 'lightgray'};
}

@media  (max-width : 760px){
  display: inline-block
}
`

const ArrowBtn = styled(Button)`
border: 1px solid lightgray;

@media  (max-width : 760px){
  display: inline-block
}

@media  (max-width : 425px){
  display: inline-block
  
}


`

const PostList = ({posts, pageLength, searchText}) => {
  const [offset, setOffset] = useState(0);
 

  const navigate = useNavigate()

  const goToPost = (post) => {
    navigate(`/posts/${post.id}`, {state : post})
  }

  const showingPage = (e,idx) => {
    console.log(e.target.textContent);
    // console.log(idx);
    setOffset((Number(e.target.textContent)-1)*10)
    // setOffset(10 * (idx-1))
    // window.scrollTo({top:0, behavior:'smooth'})
    }
  const showingArrow = (e) => {
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
    // window.scrollTo({top:0, behavior:'smooth'})
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

  return (
   
    <Wrapper>
      {posts.length === 0 ?
        <div>검색 결과가 없습니다.</div>
       
      :
        
        posts.slice(offset, offset+10).map(post =>
            <Post key={post.id} post={post} onClick={()=>goToPost(post)} >
              <Title>{textHighlight(post.title, searchText)}</Title>
              <Body>{textHighlight(post.body, searchText)}</Body>
              <User>작성자 {post.userId}</User>
            </Post>)
            
    }

          <Nav>
            {/* 검색결과에 따른거  
            
            pageLength가 10일때는 동일 
            10
            9일때? 
            8
            7
            6
            5
            4
            3
            2 
            1 ok


            10개로 생각, 100개 
           



            
            */}
            <ArrowBtn disabled={offset === 0 ? true : false} onClick={showingArrow}>&lt;</ArrowBtn>
            {Array(pageLength).fill().map((page,idx) => <Button key={idx} offset={offset} idx={idx}  value={idx+1} onClick={(e)=>showingPage(e,idx+1)}>{idx+1}</Button>)}
            
            {/*//*아래가 반응형      */}
            { //10개 : 5arr, 1,2,3,4,5
              //* posts가 50개 이하일 땐 12345에서 끝냄
              //* posts가 60개 일땐, 12345 / 6
              //* posts가 70개 일땐, 12345 / 6 7
              //*         80개 일땐, 12345, 12345, 12345, 23456, 34567, 45678 
            offset < 30 ? Array( Math.ceil(pageLength/2)).fill().map((page, idx) => <ResponsiveBtn key={idx} value={idx+1} offset={offset} idx={idx}  onClick={(e)=>showingPage(e,idx+1)} >{idx+1}</ResponsiveBtn>) : null}

            
            {  //10개 : 5arr, 1,2,3,4,5
            30<= offset && offset <80 ? Array(Math.ceil(pageLength/2)).fill().map((page, idx) => <ResponsiveBtn key={idx}  offset={offset} idx={idx} value={offset/10 + idx - 1} onClick={(e)=>showingPage(e,idx+1)} >{offset/10 + idx - 1}</ResponsiveBtn>) : null}
            
            {  //10개 : 5arr, 1,2,3,4,5
            offset >= (pageLength - 2)*10 ? Array( Math.ceil(pageLength/2)).fill().map((page, idx) => <ResponsiveBtn key={idx} value={idx+6} offset={offset} idx={idx}  onClick={(e)=>showingPage(e,idx+1)} >{idx+6}</ResponsiveBtn>) : null}
            <ArrowBtn disabled={offset >= posts.length - 10 } onClick={showingArrow}>&gt;</ArrowBtn>
          </Nav>
    </Wrapper>
  )
};

export default PostList;
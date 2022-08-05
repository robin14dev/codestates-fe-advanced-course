import React, {useEffect, useState } from "react";
import styled from "styled-components";
import {useNavigate, useLocation} from "react-router-dom"
import queryString from "query-string";


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

const PostList = ({posts, pageLength, searchText, page}) => {
  const [offset, setOffset] = useState((page-1)*10);
  const [lastBundle, setLastBundle] = useState(false)
  const [isLastBundleCheck, setIsLastBundleCheck] = useState({})


  const navigate = useNavigate()
  const location = useLocation()

  const goToPost = (post) => {
    navigate(`/posts/${post.id}`, {state : post})
  }

  const showingPage = (e) => {
    
    setOffset((Number(e.target.textContent)-1)*10)
    const {query} = queryString.parse(location.search)
    const showingQuery = `?query=${query}&page=${(Number(e.target.textContent))}`
    navigate(showingQuery)
    window.scrollTo({top:0, behavior:'smooth'})
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

  function countBundleLevel(){
    // # bundleLevel 설정 
    // offset이 바뀔때마다 bundleLevel 확인, bundleLevel로 버튼 뿌리기 
    // ex) offset : 0, 10, 20, 30, 40 => bundleLevel : 1, button은 idx+bundleLevel
    //             50, 60, 70, 80, 90 => bundleLevel : 2, 
    let result = 0;
    if(offset === 0) return 1;
    for(let i = 0; i <offset; i++) {
    if( (50 * i <= offset) && ( offset < 50*(i+1) ) ) {
      result = i+1
      return result
    
    }}
    }

  const howmanybutton  = () =>  {

  /*  
  특정 offset으로 이동할때마다 해당 bundle이 5개 묶음인지 아닌지 확인해야함
  6페이지에서 5페이지로 되돌아 가는데, 5페이지는 offset이 40이므로 howmanybutton에 적용을 안받음 특정 offset의 bundleLevel과 해당 bundleLevel

      #bundleLevel 안에서 버튼 몇개 보여줄건지 설정 
      * offset이 0, 50, 100 될때마다 남은 개수 확인 , 마지막 번들인지 확인하기 
      #1 마지막 번들이 아니면 한 번들당 10page * 5 인 50posts를 보여줄거므로
        (검색 결과수 - offset) > bundleUnit ?  buttonCount = 5(계속 5묶음씩 보여주기),
       
      #2 마지막 번들이면
        (검색 결과수 - offset) <= bundleUnit  ? buttonCount = Math.floor((검색결과수 - bundleUnit)/10) + 1 (마지막 번들)

        특정 offset의 bundleLevel(얘는 이미 알음), buttonCount(lastBundle) 기억하면, 

        {0 : false, 10 : false}

    */

       let bundleUnit = 50;
       let buttonCount =0;
       if(offset % bundleUnit === 0) { // offset : 0, 50, 100, 150 기준 // 처음에 아예 세팅
       if(posts.length - offset >= bundleUnit) { // 넘친다면 5개
          setLastBundle(false)
          // 여기서 0, 10, 20, 30, 40 false로 하기 
          for(let i = offset; i < offset + bundleUnit; i = i + 10) {
            isLastBundleCheck[i] = false
          }
          setIsLastBundleCheck(isLastBundleCheck)

       } else { // 이미 50개 미만
          buttonCount = Math.floor(Math.abs(offset - posts.length)/10) + 1
          // while(offset < bundleUnit) {
          //   isLastBundleCheck[offset] = buttonCount
          //   offset = offset + 10;
          // }
          for(let i = offset; i < offset + bundleUnit; i = i + 10) {
            isLastBundleCheck[i] = buttonCount
          }
          setIsLastBundleCheck(isLastBundleCheck)
          setLastBundle(buttonCount)
       }  
       } else { // offset : 10, 20, 30, 40 ~~~ 60, 70, 80, 90, 
          //해당 offset이 속한 번들의 버튼수를 기록해논 객체를 조회하여 세팅한다
          isLastBundleCheck[offset] === false ? setLastBundle(false) : setLastBundle(isLastBundleCheck[offset]);
       }
  }

  useEffect(()=>{
    
    if(posts.length === 0) {
      
    } else {
      countBundleLevel()
      howmanybutton()
      
    }
  }, )

 
  

  return (
   
    <Wrapper>
      {posts.length === 0 ?
        <div>검색 결과가 없습니다.</div>
       
      :
        
        <>{ posts.slice(offset, offset+10).map(post =>
          <Post key={post.id} post={post} onClick={()=>goToPost(post)} >
            <Title>{textHighlight(post.title, searchText)}</Title>
            <Body>{textHighlight(post.body, searchText)}</Body>
            <User>작성자 {post.userId}</User>
          </Post>)}
          <Nav>
           
            <ArrowBtn disabled={offset === 0 ? true : false} onClick={showingArrow}>&lt;</ArrowBtn>


            {Array(pageLength).fill().map((page,idx) => <Button key={idx} offset={offset} idx={idx}  value={idx+1} onClick={(e)=>showingPage(e,idx+1)}>{idx+1}</Button>)}

            {Array((lastBundle? lastBundle : 5  )).fill().map((page,idx) => 

           
              
                <ResponsiveBtn key={idx} offset={offset} value = {5*(countBundleLevel()) -4 + idx}  onClick={(e)=>showingPage(e)}>{5*(countBundleLevel()) -4 + idx}</ResponsiveBtn>
              
            )}
            
            
            <ArrowBtn disabled={offset >= posts.length - 10 } onClick={showingArrow}>&gt;</ArrowBtn>
          </Nav>
        </>
            
    }

         
    </Wrapper>
  )
};

export default PostList;
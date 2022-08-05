import React, { useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from "react-icons/bs";
import {useNavigate} from "react-router-dom"
const Wrapper = styled.div`
background-color: #f6f9fa ;
width: 100%;
height: 8rem;
display: flex;
justify-content: center;
align-items: center;

& > input {
  width: 30%;
  height: 2.5rem;
  box-shadow: 0.1rem 0.1rem 0.11rem lightgray;
  border-radius: 0.2rem 0 0 0.2rem;
  /* margin: 0 1rem; */
  padding-left: 1rem;
  @media  (max-width : 768px){
  width: 58%;
}

@media  (max-width : 425px){
  width: 70%;
}

}

& > button {
  height: 2.5rem;
  background-color: white;
  padding: 0 1rem;
  box-shadow: 0.1rem 0.1rem 0.11rem lightgray;
  border-radius: 0 0.2rem 0.2rem 0 ;
}

`


const Search = ({onSearch}) => {
  const [text, setText] = useState('')

  let navigate = useNavigate()
  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const onKeyPress = (e) => {

    if(e.key === 'Enter') {
   
      onSearch(text);
      navigate(`?query=${text}`)
    }
   
   }

  const onClickSearch = () => {
    
    onSearch(text)
    navigate(`?query=${text}`)

  }

  return (
    <Wrapper>
      <input placeholder='검색해보세요' onKeyPress={onKeyPress} onChange={onChangeText}></input> 
     <button onClick={onClickSearch}><BsSearch size={20}/></button>
    </Wrapper>
  );
};

export default Search;
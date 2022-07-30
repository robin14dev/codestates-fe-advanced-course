import { Routes, Route, Link, useNavigate } from "react-router-dom";
import PostList from "./components/PostList";
import Post from "./components/Post"
import styled from "styled-components";

const Wrapper = styled.div`
`

const Header = styled.div`
background-color: navy;
height: 4rem;
width: 100vw;
color: white;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
position: sticky;
top: 0;
margin-bottom: 4rem;
`

function App() {
  
  let navigate = useNavigate()


 const gohome = () => {
  navigate("/")
 }
  return (
    <Wrapper>
       <Header onClick={gohome}><h1>FE-Advanced</h1></Header>
     <Routes>
      <Route exact path="/" element={<PostList />}></Route>
      <Route exact path="/posts/:id" element={<Post />}></Route>
     </Routes>
    </Wrapper>
  );
}

export default App;

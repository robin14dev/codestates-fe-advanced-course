import { Routes, Route} from "react-router-dom";
import Post from "./components/Post"
import Mainpage from "./pages/Mainpage";
import styled from "styled-components";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet-async";

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

@media (max-width: 425px) {
  &> h1 {
    font-size: 1.5rem;
  }
}
`

function App() {
  

 const gohome = () => {
  window.location.replace('/')

 }
  return (

  
    <Wrapper>
       <Helmet>
    <title>FE-Advanced</title>
    </Helmet>
       <Header onClick={gohome}><h1>FE-Advanced</h1></Header>
     <Routes>
      <Route path="/" element={<Mainpage />}></Route>
      <Route path="/posts/:id" element={<Post />}></Route>
     </Routes>
     <Footer />
    </Wrapper>
  );
}

export default App;

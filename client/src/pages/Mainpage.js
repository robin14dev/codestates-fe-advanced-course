import React, {useState, useEffect}from 'react';
import PostList from '../components/PostList';
import Search from '../components/Search';
import axios from 'axios';


const Mainpage = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('')
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

  /* //# search SUDO 
   텍스트 입력후 버튼 누르면 onsearch 작동해서 현재 posts 상태에 들어있는거 title, body에 들어있는것들로 모아논거 다시 필터링해서 상태변경해주기
   해당 검색어로 필터링된 것들에서 검색단어 제목에있는거 글자 색표시해주기  
  */

   const onSearch = (text) => {
    console.log('onsearch text', text);

    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    .then(response => {
      const filtered = response.data.filter(post => {
        return (post.title.indexOf(text) >=0 || post.body.indexOf(text) >= 0)
       })
     setSearchText(text)
      setPosts(filtered)
      console.log(filtered);
    })
    .catch(err => {
      console.log(err);
    })
   
   }


  return (
    <div>
      <Search onSearch={onSearch}/>
      <PostList
       posts={posts}
       searchText={searchText}
       pageLength={pageLength}
       />
    </div>
  );
};

export default Mainpage;
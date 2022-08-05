import React, {useState, useEffect}from 'react';
import PostList from '../components/PostList';
import Search from '../components/Search';
import axios from 'axios';
import { Routes, Route, useLocation } from 'react-router-dom';
import queryString from "query-string";


const Mainpage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([] );
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const pageLength = Math.ceil(filteredPosts.length / 10) // 10
  const location = useLocation()
  
  useEffect(()=>{
    
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    .then(response => {
      // console.log(response);
      setPosts(response.data)
      setFilteredPosts(response.data)
      const {query, page} = queryString.parse(location.search)//{page: '2', query: 'sunt'}
      if((page || 1)&& (query !=='undefined' && undefined)) {
        //url에 검색값이 있으면
        // console.log('url에 검색값과 page가 있으면', query);
        onSearch(query)
        setPage(Number(page))
      } 
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  useEffect(()=> {
    setFilteredPosts(filteredPosts)
  }, [searchText])

  /* //# search SUDO 
   텍스트 입력후 버튼 누르면 onsearch 작동해서 현재 posts 상태에 들어있는거 title, body에 들어있는것들로 모아논거 다시 필터링해서 상태변경해주기
   해당 검색어로 필터링된 것들에서 검색단어 제목에있는거 글자 색표시해주기  
  */

   /*원하는거 : 검색 결과가 남아있는거 => 검색한 후 뒤로가기 눌렀을 때 검색된 결과가 남아있어야 됨
    현재 문제 : 상세페이지로 갔다가 뒤로가기 누르면 메인페이지가 다시 렌더링 되는데 그러면 빈배열로된 useEffect가 호출
    새로 다시 받아와짐

    해결방안 : 뒤로가기 눌렀을 때 메인페이지가 다시 렌더링 될때 쌩으로 불러오는 빈배열 말고, 기존 검색결과 
    1. 별도로 전체 자료를 빈배열로 받아옴
    2. 검색값을 posts에서 찾아서 필터링된 결과를 posts에서 복사해서 filteredPosts 상태값으로 줌
    3. filteredPosts를 렌더링함 종속성 배열에는 searchText를둬서 검색을 하지 않는 이상 렌더링이 되지 않게함


    안된 상황 뒤로가기 버튼

    검색창에 검색어 입력했을 때 결과에 따라서 그냥 렌더링되게 했는데 기억을 하려면 url을 심어야함
    페이지네이션도 각각의 페이지  
   */
   const onSearch = (text) => {
   
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    .then(response => {
      const filtered = response.data.filter(post => {
        
        return (post.title.toLowerCase().indexOf(text.toLowerCase()) >=0 || post.body.toLowerCase().indexOf(text.toLowerCase()) >= 0)
       })
     setSearchText(text)
      // setPosts(filtered)
      setFilteredPosts(filtered)

    })
    .catch(err => {
      console.log(err);
    })
   }


  return (
    <div>
      <Search onSearch={onSearch}/>
      <Routes>

       
        <Route path='/'
               element={<PostList
                          posts={filteredPosts}
                          searchText={searchText}
                          pageLength={pageLength}
                          page={page}
                       />}
              >
        </Route>
      </Routes>
    </div>
  );
};

export default Mainpage;
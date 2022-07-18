import React,{useState,useEffect} from 'react'
import {Route} from 'react-router-dom';
import {getFirstPosts,getPosts} from '../_actions/post_actions';
import useFetch from '../hook/useFetch';
import LandingCard from '../components/Landing/LandingCard';
import '../styles/Landing.css';
import {category} from '../datas/Data';
import LoadingSpinner from '../components/Utill/LoadingSpinner';
import Menu from '../components/Landing/Menu';
import InfiniteScroll from '../hook/InfiniteScroll';

// 리스트 아이템을 누르면, 쿼리 filter가 추가되고,
// list 아이템은 background-color 가 변경되고
// LandingCard 는 쿼리에 맞는 내용을 출력

const LandingPage = (props) => {
    const [pageLoading,setPageLoading]=useState(true);
    const [query,setQuery]=useState({
        skip:0,
        limit:3,
        filter:props.match.params.id ? 
        { category : [ Number(props.match.params.id)] } :
        null
        
    })
    const {posts,postLength,loading} = useFetch([getFirstPosts,getPosts],query);
    
    const loadingStyle = {
        display:'flex',
        width:'100%',
        height:'100vh',
        justifyContent:'center',
        alignItems:'center'
    }
    
    const loadMorePosts =()=>{
         let newQuery = {...query};
         newQuery.skip = newQuery.skip + newQuery.limit;
         setQuery(newQuery);
    }

    const {lastIndexRef} = InfiniteScroll(loadMorePosts,postLength,loading);
    
    useEffect(()=>{
        if(!loading)
        setPageLoading(false);
    },[loading]);
   // 처음 페이지 로드 => 
    
    if(pageLoading){
        return (
        <LoadingSpinner {...loadingStyle}/>
        )
    }
    return (
        <>
         <Route exact path="/">
          <Menu items={category}/>
          <LandingCard items={posts} loadMorePosts={loadMorePosts} lastIndexRef={lastIndexRef}/>
         </Route>

         <Route exact path={`/category/:id`}>
          <LandingCard items={posts} loadMorePosts={loadMorePosts} lastIndexRef={lastIndexRef}/>
         </Route>
        </>
    )
}

export default LandingPage

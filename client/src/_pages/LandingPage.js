import React,{useState,useEffect,useCallback} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getFirstPosts,getPosts} from '../_actions/post_actions';
import useFetch from '../hook/useFetch';

import LandingCard from '../components/Landing/LandingCard';
import '../styles/Landing.css';
import {category} from '../datas/Data';
import LoadingSpinner from '../components/Utill/LoadingSpinner';
import Button from '../components/Utill/Button';
import Menu from '../components/Landing/Menu';


const LandingPage = () => {

    const [query,setQuery]=useState({
        skip:0,
        limit:4
    })
    
    const {posts,postLength,loading} = useFetch(getPosts,query);
    const loadMorePosts =()=>{
         let newQuery = {...query};
         newQuery.skip = newQuery.skip + newQuery.limit;
         setQuery(newQuery);
         
    }
    console.log(posts);
    console.log(query);

    

    return (
        <>
         <Menu items={category}/>
         <LandingCard items={posts} loadMorePosts={loadMorePosts}/>
         {loading ? <LoadingSpinner/> :
         <Button click={loadMorePosts} name="더 보기"/>
         }
         
         
        </>
    )
}

export default LandingPage

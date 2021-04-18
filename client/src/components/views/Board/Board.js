import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getFirstPosts} from '../../../_actions/post_actions';
import Posts from './Posts';
import Pagination from './Pagination';

import './Board.css';


const Board = () => {
    const dispatch = useDispatch();
    const [pages,setPages]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [pagePerPosts,setPagePerPosts]=useState(3);
    const [currentPosts,setCurrentPosts]=useState([]);
    


    const posts = useSelector(state=>state.post.posts);

    useEffect(()=>{
        let variable={
            skip:0,
            
        }
        dispatch(getFirstPosts(variable))

    },[])

    useEffect(()=>{
        const pageLength = Math.ceil(posts.length / pagePerPosts);
        const pageNumber = Array(pageLength).fill().map((_,i)=>i+1);

        setPages(pageNumber);
        const currentPosts = posts.slice(0,3);
        setCurrentPosts(currentPosts);

    },[posts])
    
    useEffect(()=>{
        
    const firstIndexOfPage = (currentPage - 1) * pagePerPosts;
    const lastIndexOfPage = firstIndexOfPage + pagePerPosts;
    const currentPosts = posts.slice(firstIndexOfPage,lastIndexOfPage);
   
    setCurrentPosts(currentPosts);
    

    },[currentPage])

   

    const changePage = (page) =>{
        setCurrentPage(page);


    }




    return (
        <div>
            <Posts posts={currentPosts} />
            <Pagination pages={pages} changePage={changePage}/>
            
        </div>
    )
}

export default Board

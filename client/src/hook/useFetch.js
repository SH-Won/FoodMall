import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';

const useFetch = (action,query) => {
    
    const dispatch =useDispatch();
    const [loading,setLoading]=useState(true);
    const {posts,postLength} =useSelector(state => state.post);
    const [hasMore,setHasMore]=useState();

    useEffect(()=>{
        console.log('useEffect');
        setLoading(true);
        dispatch(action(query))
        .then(response=> setLoading(false))
       
       
    },[query])

    return {
        posts,
        postLength,
        loading
        
    }
    
}

export default useFetch

import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import LoadingSpinner from '../components/Utill/LoadingSpinner';

const useFetch = (action,query) => {
    
    const dispatch =useDispatch();
    const [loading,setLoading]=useState(true);
    const {posts,postLength} =useSelector(state => state.post);

    useEffect(()=>{
        setLoading(true);
        if(action.length >=2 && query.skip !== 0){
           dispatch(action[1](query))
           .then(response => setLoading(false))
        }
        else{
           dispatch(action[0](query))
           .then(response=> setLoading(false))
        }

    },[query])

    return {
        posts,
        postLength,
        loading 
    }
}

export default useFetch

import React,{useState,useRef,useCallback,useEffect} from 'react'

const InfiniteScroll = (callback,hasMore,loading) => {
    
    console.log('infiniteScroll');
    const observer =useRef();
    const handleScroll = ( ([entry],ob) =>{
        console.log('entry',entry);
        
        if(entry.isIntersecting && hasMore){
            
          callback();
          ob.unobserve(entry.target);
        }
    })
    
    const lastIndexRef =useCallback((node)=>{
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(handleScroll,{threshold:0.8})
        if(node) observer.current.observe(node)
    },[loading,hasMore])
    return {
        lastIndexRef
    }
    
}

export default InfiniteScroll

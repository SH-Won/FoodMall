import React,{useRef,useCallback,useEffect} from 'react'

const InfiniteScroll = (cb,hasMore) => {
    const observer =useRef();
    const handleScroll = ([entry]) =>{
        if(entry.isIntersecting && hasMore)
          cb();
    }
    
    const lastIndexRef =useCallback((node)=>{
        if(!node) return;
        if(observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(handleScroll)
        if(node) observer.current.observe(node)
    },[hasMore,handleScroll])
    return {
        lastIndexRef
    }
    
}

export default InfiniteScroll

import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getData} from '../../../_actions/test_actions'


const Container = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.test);
    const [skip,setSkip]=useState(0);
    const [limit,setLimit]=useState(4);

    const list = 
     posts.map(post =>{
         return (
        <div key={post._id}>
            <span>{post.title}</span>
        </div>
         )
    })

    useEffect(()=>{
        let variable = {
            skip,
            limit
        }
        dispatch(getData(variable))
        

    },[skip])



    const loadMore = ()=>{
        setSkip(skip => skip+limit);
    }

   console.log(posts);

    return (
        <div className="wrap">

            {list}
            <button onClick={loadMore}> 더보기 </button>
            
        </div>
    )
}

export default Container

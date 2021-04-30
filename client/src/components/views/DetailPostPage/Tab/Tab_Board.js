import React,{useState,useEffect} from 'react'
import axios from 'axios';

const Tab_Board = () => {
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        getData()
        .then(data => setPosts(data))

    },[])


    function getData(){
       const data =  axios.get('/api/posts/getPosts')
        .then(response=>response.data);

        return data;
    }

    return (
        <div>
            <ul>
            {posts.map(post =>(
               <li key={post._id}>{post.title}</li>
            ))}
            </ul>
        </div>
    )
}

export default Tab_Board

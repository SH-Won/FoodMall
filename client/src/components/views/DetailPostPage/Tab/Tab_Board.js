import React from 'react'
import axios from 'axios';

const Tab_Board = ({posts}) => {
    

   console.log('보드');

    return (
        <div>
            <ul>
            {posts && posts.map(post =>(
               <li key={post._id}>{post.title}</li>
            ))}
            </ul>
        </div>
    )
}

export default Tab_Board

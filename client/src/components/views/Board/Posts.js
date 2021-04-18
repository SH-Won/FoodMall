import React from 'react'

const Posts = ({posts}) => {

    return (
        <div>
            <ul>
              {posts.map(post=>(
                  <li key={post._id}> {post.title} </li>
              ))}
            </ul>
            
        </div>
    )
}

export default Posts

import React from 'react'

const LandingCard = ({posts,getMorePosts}) => {
    return (
        <div className="card-wrap">
        <div className="card-container">
            {posts && posts.map((post,index)=>(
                <div key={index} className="card">
                    <div className="card-img-container">
                   <a href={`/post/${post._id}`}> <img className="card-img" src={post.images[0]}/> </a>
                    </div>
                    <ul className="card-information">
                        <li>제목 {post.title}</li>
                        <li>작성자 {post.writer.name}</li>
                        <li>분류 {post.category}</li>
                    </ul>
                </div>
            ))}
            
            
        </div>
        <button className="more-card-button" onClick={getMorePosts} >더보기</button>
        </div>
    )
}

export default LandingCard

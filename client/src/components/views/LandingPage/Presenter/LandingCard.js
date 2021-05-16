import React from 'react'
import {Link} from 'react-router-dom';
import {category} from '../Data'

const LandingCard = (props) => {
    const {posts,getMorePosts,postSize,limit,title} =props;
   
   // let hasProperty = match.params.hasOwnProperty('id');
   // let title = hasProperty && category.find(item=>item._id === Number(match.params.id));

  // console.log(title);

   
    return (
        <div className="card-wrap">
            {title && 
            <h2>{title}</h2>
            }
        <div className="card-container">
            {posts && posts.map((post,index)=>(
                <div key={index} className="card">
                   
                   <div className="card-img-container">
                  <Link to={`/post/${post._id}`}>  <img className="card-img" src={post.images[0]}/> </Link>
                   </div>

                    <ul className="card-information">
                        <li> {post.title}</li>
                        <li>{post.price} 원</li>
                        
                    </ul>
                </div>
            ))}
            
            
        </div>
        { postSize >= limit &&
        <button className="more-card-button" onClick={getMorePosts} >더보기</button>
        }
        </div>
    )
}

export default LandingCard

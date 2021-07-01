import React from 'react'
import {Link} from 'react-router-dom';

const LandingCard = (props) => {

    const{items,loadMorePosts} = props;

    return (
        <div className="container">
            <div className="card-container">
            {items.map(item => (
                <div className="card" key={item._id}>
                    <Link to={`/detail/${item._id}`}>
                    <div className="card-img">
                        <img src={item.images[0]}/>
                    </div>
                    <ul className="card-information">
                       <li>{item.title}</li>
                       <li>{item.price}</li>
                    </ul>
                    </Link>
                </div>
                
            ))}
            </div>
            
        </div>
    )
}

export default LandingCard

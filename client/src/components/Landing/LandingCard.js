import React from 'react'

const LandingCard = (props) => {

    const{items,loadMorePosts} = props;

    return (
        <div className="container">
            <div className="card-container">
            {items.map(item => (
                <div className="card" key={item._id}>
                    <div className="card-img">
                        <img src={item.images[0]}/>
                    </div>
                    <ul className="card-information">
                       <li>{item.title}</li>
                       <li>{item.price}</li>
                    </ul>
                </div>
            ))}
            </div>
            
        </div>
    )
}

export default LandingCard

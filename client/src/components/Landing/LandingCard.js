import React from 'react';
import { Link } from 'react-router-dom';

const LandingCard = props => {
    const { items, lastIndexRef } = props;
    const lastIndex = items.length - 1;
    return (
        <div className="container">
            <div className="card-container">
                {items.map((item, index) => (
                    <div className="card" key={item._id} ref={index === lastIndex ? lastIndexRef : null}>
                        <Link to={`/detail/${item._id}`}>
                            <div className="card-img">
                                <img src={item.images[0]} />
                            </div>
                            <ul className="card-information">
                                <li>{item.title}</li>
                                <li>{parseInt(item.price, 10).toLocaleString('ko-KR')}원</li>
                            </ul>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingCard;

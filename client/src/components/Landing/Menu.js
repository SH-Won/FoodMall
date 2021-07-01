import React from 'react'
import {Link} from 'react-router-dom';

const Menu = (props) => {
    const {items,handleCategory,match} = props;
    return (
        
        <ul className="landing-menu-list" >
            {items.map(item => (
                <li key={item._id} dataset={item._id}>
                    <Link to={`/category/${item._id}`}>{item.name}</Link>
                </li>
            ))}
            
        </ul>
        
    )
}

export default Menu

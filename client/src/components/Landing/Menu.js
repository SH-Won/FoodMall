import React from 'react'

const Menu = (props) => {
    const {items} = props;
    return (
        
        <ul className="landing-menu-list">
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
            
        </ul>
        
    )
}

export default Menu

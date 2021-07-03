import React from 'react'
import {Link} from 'react-router-dom';

const TabMenu = ({match}) => {

    const handleClick = (e) =>{
        if(e.target.nodeName !== 'A') return
        e.target.parentElement.parentElement.children.forEach(child => child.classList.remove('act'));
        e.target.parentElement.classList.add('act');

        if(e.target.parentElement === e.target.parentElement.parentElement.children[0])
          e.target.parentElement.style.borderLeft = '0';
          if(e.target.parentElement === e.target.parentElement.parentElement.children[2])
          e.target.parentElement.style.borderRight = '0';
        
    }
    return (
        <ul className="tab-menu" onClick={handleClick}>
            <li className="tab-item act"><Link to={`${match.url}`}>상세정보</Link></li>
            <li className="tab-item"><Link to={`${match.url}/board`}>제품목록</Link></li>
            <li className="tab-item"><Link to={`${match.url}/comment`}>댓글</Link></li>
        </ul>
    )
}

export default TabMenu

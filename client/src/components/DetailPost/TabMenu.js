import React from 'react'
import {Link} from 'react-router-dom';

const TabMenu = ({match}) => {
    let checkURL = match.url.split('/');
    console.log(match);

    console.log(checkURL);
    return (
        <ul className="tab-menu">
            <li className="tab-item"><Link to={`${match.url}`}>상세정보</Link></li>
            <li className="tab-item"><Link to={`${match.url}/board`}>제품목록</Link></li>
            <li className="tab-item"><Link to={`${match.url}/comment`}>댓글</Link></li>
        </ul>
    )
}

export default TabMenu

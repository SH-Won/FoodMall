import React from 'react'
import {Link} from 'react-router-dom';

export default function Menu({match}) {
    
    return (
        <section className="tab">
            <ul className="tab-menu">
                <li><Link to={match.url}>상세정보</Link></li>
                <li><Link to={`${match.url}/board`}>전체상품</Link></li>
                <li><Link to={`${match.url}/comment`}>댓글</Link></li>
            </ul>
            </section>
    )
}

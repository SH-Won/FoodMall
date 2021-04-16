import React from 'react'
import axios from 'axios';
import {USER_SERVER} from '../Config';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './Navbar.css';


const Navbar = (props) => {
    const user = useSelector(state=>state.user)
    const logoutHandler =()=>{
        axios.get(`${USER_SERVER}/logout`)
        .then(response=>{
            if(response.status ===200){
                props.history.push('/login');
            } else{
                alert('로그아웃에 실패했습니다')
            }
        })
    }

    if(user.userData && !user.userData.isAuth){
        return(
            <nav className="navbar">
            <h2>MALL</h2>
            <div className="navbar-list">
            <ul className="navbar-left-list">
                <li><a href="/">홈</a></li>
                <li>좋아요</li>
                
            </ul>
            
            <ul className="navbar-right-list">
                 <li><a href="/login">로그인</a></li>
                 <li><a href="/register">회원가입</a></li>
            </ul>
            </div>
            
        </nav>

        )
    } else {
        return(
            <nav className="navbar">
            <h2>MALL</h2>
            <div className="navbar-list">
            <ul className="navbar-left-list">
                <li><a href="/">홈</a></li>
                <li>좋아요</li>
                
            </ul>
            
            <ul className="navbar-right-list">
                 <li><a href="/cart">장바구니 <span>{user.userData && user.userData.cart.length}</span></a></li>
                 <li><a href="/upload">글 올리기</a></li>
                 <li><a onClick={logoutHandler}>로그아웃</a></li>
            </ul>
            </div>
            
        </nav>
        )

    }
}
    

export default withRouter(Navbar);

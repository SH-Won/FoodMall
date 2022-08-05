import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsPerson, BsHouseDoor, BsUpload, BsBucket, BsPersonPlus, BsPower } from 'react-icons/bs';
import './Navbar.css';

const Navbar = props => {
    const user = useSelector(state => state.user);
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push('/login');
            } else {
                alert('로그아웃에 실패했습니다');
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <nav className="navbar">
                <div className="navbar-list">
                    <ul className="navbar-left-list">
                        <li>
                            <Link to="/">
                                <BsHouseDoor />
                            </Link>
                        </li>
                    </ul>

                    <span>MALL</span>

                    <ul className="navbar-right-list">
                        <li>
                            <Link to="/login">
                                <BsPerson />
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <BsPersonPlus />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar">
                <div className="navbar-list">
                    <ul className="navbar-left-list">
                        <li>
                            <Link to="/">
                                <BsHouseDoor />
                            </Link>
                        </li>
                    </ul>

                    <span>MALL</span>

                    <ul className="navbar-right-list">
                        {user.userData && user.userData.role !== 1 && (
                            <li>
                                <Link to="/cart">
                                    <div className="shopping-cart">
                                        <BsBucket />
                                        {user.userData && user.userData.cart.length > 0 && (
                                            <span className="shopping-cart-number">
                                                {user.userData && user.userData.cart.length}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        )}
                        {user.userData && user.userData.role === 1 && (
                            <li>
                                <Link href="/upload">
                                    <BsUpload />
                                </Link>
                            </li>
                        )}
                        <li style={{ cursor: 'pointer' }} onClick={logoutHandler}>
                            <BsPower />
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};

export default withRouter(Navbar);

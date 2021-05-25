import React from 'react'
import axios from 'axios';

import {USER_SERVER} from '../../Config';
import {withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AiOutlineHome,AiOutlineLogin,AiOutlineShoppingCart} from 'react-icons/ai'
import {BsPerson,BsHouseDoor,BsUpload,BsBucket,BsPersonPlus,BsPower} from 'react-icons/bs'
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
            <div className="navbar-list">
             <ul className="navbar-left-list">
                <li><a href="/"><BsHouseDoor/></a></li>
             </ul>
            
             <span>MALL</span>
            
             <ul className="navbar-right-list">
                 <li><a href="/login"><BsPerson/></a></li>
                 <li><a href="/register"><BsPersonPlus/></a></li>
             </ul>
            </div>
        </nav>
        )
    } else {
        return(
        <nav className="navbar">
             <div className="navbar-list">
              <ul className="navbar-left-list">
                <li><a href="/"><BsHouseDoor/></a></li>
              </ul>

              <span>MALL</span>
             
               <ul className="navbar-right-list">
                 <li>
                    <a href="/cart">
                     <div className="shopping-cart">
                         <BsBucket/>
                         {user.userData && user.userData.cart.length >0 &&
                          <span className="shopping-cart-number">
                             {user.userData && user.userData.cart.length}
                          </span>
                         }
                     </div>
                    </a>
                </li>
                 <li><a href="/upload"><BsUpload/></a></li>
                 <li style={{cursor:'pointer'}} onClick={logoutHandler}><BsPower/></li>
               </ul>
            </div>
        </nav>
        )

    }
}
    

export default withRouter(Navbar);

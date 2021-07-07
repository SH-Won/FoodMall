import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import CartItem from '../components/Cart/CartItem';
import {getUserCartItem,deleteUserCartItem} from '../_actions/user_actions'

import '../styles/Cart.css';


const CartPage = () => {
    const dispatch = useDispatch();
    const [loading,setLoading] =useState(true);
    const {userData,cartDetail} = useSelector(state => state.user);

    useEffect(()=>{
        let postIds =[];
        if(userData && userData.cart.length > 0 ){
            userData.cart.forEach(item => postIds.push(item.id))
            dispatch(getUserCartItem(postIds,userData.cart))
        }

    },[userData])

    const deleteCartItem = (postId) =>{
          dispatch(deleteUserCartItem(postId))
    }


    return (
        <div>
            <CartItem items={cartDetail} deleteCartItem={deleteCartItem}/>  
        </div>
    )
}

export default CartPage

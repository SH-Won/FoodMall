import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getCartItemDetail,removeCartItem} from '../../../_actions/user_actions';
import Cart_Item from './Presenter/Cart_Item';
import './Cart.css';

const CartPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);

    useEffect(()=>{
        let postIds =[];
        
        if(user.userData && user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(cartItem=> postIds.push(cartItem.id))
                
                console.log(postIds);
                dispatch(getCartItemDetail(postIds,user.userData.cart))
            }
        }

        
    },[user.userData])

    const deleteCartItem = (postId)=>{
        dispatch(removeCartItem(postId))
    }

  

    return (
        <div>
            <Cart_Item items={user.cartDetail} deleteCartItem={deleteCartItem}/>
        </div>
    )
}

export default CartPage

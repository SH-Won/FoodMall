import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getCartItemDetail,removeCartItem} from '../../../_actions/user_actions';
import Cart_Item from './Presenter/Cart_Item';
import './Cart.css';

const CartPage = () => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice]=useState(0);
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

    // [{} , {} , {}] 
    useEffect(()=>{
        let sum = 0;
      sum = user.cartDetail && user.cartDetail.reduce((pre,cur)=>{
              let price = Number(cur.price.split(',').join(''));
              let quantity = cur.quantity;

              return pre + price*quantity;
             
      },0)
      // 45,070,123

      setTotalPrice(sum);
     

    },[user.cartDetail])
    console.log(totalPrice);

    const deleteCartItem = (postId)=>{
        dispatch(removeCartItem(postId))
    }

  

    return (
        <div>
            <Cart_Item items={user.cartDetail} deleteCartItem={deleteCartItem}/>
            <span> </span>
        </div>
    )
}

export default CartPage

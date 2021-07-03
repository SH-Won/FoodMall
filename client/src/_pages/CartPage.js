import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getUserCartItem} from '../_actions/user_actions'


const CartPage = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector(state => state.user);

    useEffect(()=>{
        let postIds =[];
        if(userData && userData.cart.length > 0 ){
            userData.cart.forEach(item => postIds.push(item.id))

            dispatch(getUserCartItem(postIds,userData.cart))

        }

    },[userData])

    

    return (
        <div>
            
        </div>
    )
}

export default CartPage

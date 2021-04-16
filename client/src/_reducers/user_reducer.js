import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_CART_ITEM,
    GET_CART_ITEM_DETAIL,
    REMOVE_CART_ITEM
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case ADD_CART_ITEM:
            return {
                ...state,
                userData:{
                    ...state.userData,
                    cart:action.payload
                }
            }
        case GET_CART_ITEM_DETAIL:
            return{
                ...state,
                cartDetail:action.payload
            }
        case REMOVE_CART_ITEM:
            return{
                ...state,
                userData:{
                    ...state.userData,
                    cart:action.payload.cart
                },
                cartDetail:action.payload.cartDetail
            }
        default:
            return state;
    }
}
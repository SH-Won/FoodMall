import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_CART_ITEM,
    GET_CART_ITEM_DETAIL,
    REMOVE_CART_ITEM,
    ADD_USER_CART_ITEM,
    GET_USER_CART_ITEM,
    DELETE_USER_CART_ITEM,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`).then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`).then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request,
    };
}
/*
export function addCartItem(postId){
    const request = axios.get(`${USER_SERVER}/addCartItem?postId=${postId}`)
    .then(response=>response.data)

    return{
        type:ADD_CART_ITEM,
        payload:request
    }

}
export function getCartItemDetail(postIds,userCart){
    const request = axios.get(`/api/posts/getPostDetail?postId=${postIds}&type=array`)
    .then(response=>{
        userCart.forEach(cart=>{
            response.data.forEach((post,index)=>{
                if(post._id === cart.id)
                response.data[index].quantity = cart.quantity
                
            })
        })
        return response.data;
    })

    console.log(request);

    return{
        type:GET_CART_ITEM_DETAIL,
        payload:request
    }

}
export function removeCartItem(postId){
    const request = axios.get(`${USER_SERVER}/removeCartItem?postId=${postId}`)
    .then(response=>{
        response.data.cart.forEach(item=>{
            response.data.cartDetail.forEach((post,index)=>{
                if(item.id===post._id)
                response.data.cartDetail[index].quantity=item.quantity
            })
        })
        return response.data
    })

    return{
        type:REMOVE_CART_ITEM,
        payload:request
    }

}
*/

export function addCartItem(postId) {
    const request = axios.get(`${USER_SERVER}/addCartItem?postId=${postId}`).then(response => response.data);

    return {
        type: ADD_CART_ITEM,
        payload: request,
    };
}

export function getCartItemDetail(postIds, userCart) {
    const request = axios.get(`/api/posts/getCartItemDetail?postIds=${postIds}&type=array`).then(response => {
        userCart.forEach(cart => {
            response.data.forEach((post, index) => {
                if (post._id === cart.id) response.data[index].quantity = cart.quantity;
            });
        });
        return response.data;
    });

    return {
        type: GET_CART_ITEM_DETAIL,
        payload: request,
    };
}

export function removeCartItem(postId) {
    const request = axios.get(`${USER_SERVER}/removeCartItem?postId=${postId}`).then(response => {
        response.data.cart.forEach(item => {
            response.data.posts.forEach((post, index) => {
                if (post._id === item.id) response.data.posts[index].quantity = item.quantity;
            });
        });
        return response.data;
    });
    return {
        type: REMOVE_CART_ITEM,
        payload: request,
    };
}

/* 리뉴얼 */

export function addUserCartItem(variable) {
    const request = axios.post(`${USER_SERVER}/addUserCartItem`, variable).then(response => response.data);

    return {
        type: ADD_USER_CART_ITEM,
        payload: request,
    };
}

export function getUserCartItem(postIds, userCart) {
    const request = axios.get(`/api/posts/getUserCartItem?postIds=${postIds}&type=array`).then(response => {
        userCart.forEach(cart => {
            response.data.forEach((post, index) => {
                if (post._id === cart.id) {
                    response.data[index].quantity = cart.quantity;
                }
            });
        });

        return response.data;
    });

    return {
        type: GET_USER_CART_ITEM,
        payload: request,
    };
}

export function deleteUserCartItem(postId) {
    const request = axios.post(`${USER_SERVER}/deleteUserCartItem`, { postId }).then(response => {
        response.data.cart.forEach(cart => {
            response.data.cartDetail.forEach((info, index) => {
                if (cart.id === info._id) response.data.cartDetail[index].quantity = cart.quantity;
            });
        });
        return response.data;
    });

    return {
        type: DELETE_USER_CART_ITEM,
        payload: request,
    };
}

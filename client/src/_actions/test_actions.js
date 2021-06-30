import axios from 'axios';
import {TEST_GET_POSTS} from './types';

export function getData(variable){
    
    let {skip,limit} = variable
    const response =  axios.get(`/api/posts/getPosts?skip=${skip}&limit=${limit}`)
    .then(response => response.data);

  

    return {
        type:TEST_GET_POSTS,
        payload: response
    }

}
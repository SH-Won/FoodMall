import axios from 'axios';
import {
    UPLOAD_FILES,
    UPLOAD_POST,
    GET_POSTS,
    GET_FIRST_POSTS,
    GET_POST_DETAIL
} from './types';

export function uploadFiles(formData,config){
    const request = axios.post('/api/posts/uploadfiles',formData,config)
    .then(response=>response.data)

    return{
        type:UPLOAD_FILES,
        payload:request
    }
}

export function uploadPost(variable){
    const request = axios.post('/api/posts/uploadPost',variable)
    .then(response=> response.data);
    
    return{
        type:UPLOAD_POST,
        payload:request
        
    }
}
export  function getPosts(variable){
    
    const request=  axios.get('/api/posts/getPosts',{params:{
        skip:variable.skip,
        limit:variable.limit,
        filter:variable.filter
    }},)
    .then(response=> response.data );

    return{
        type:GET_POSTS,
        payload:request
    }
}
export  function getFirstPosts(variable){

    const request=  axios.get('/api/posts/getPosts',{params:{
        skip:variable.skip,
        limit:variable.limit ? variable.limit : 100,
        filter:variable.filter ? variable.filter : '',
    }},)
    .then(response=> response.data );

    return{
        type:GET_FIRST_POSTS,
        payload:request
    }
}
export  function getPostDetail(postId){

    const request =  axios.get(`/api/posts/getPostDetail?postId=${postId}&type=single`)
    .then(response=>response.data)

   // console.log('request',request);

    return{
        type:GET_POST_DETAIL,
        payload:request
    }
}
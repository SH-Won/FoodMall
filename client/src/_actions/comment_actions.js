import axios from 'axios';
import { SAVE_COMMENT, GET_COMMENTS } from './types';

export function saveComment(variable) {
    const request = axios.post('/api/comment/saveComment', variable).then(response => response.data);

    return {
        type: SAVE_COMMENT,
        payload: request,
    };
}
export function getComments(postId) {
    const request = axios.get(`/api/comment/getComments?postId=${postId}`).then(response => response.data);

    return {
        type: GET_COMMENTS,
        payload: request,
    };
}

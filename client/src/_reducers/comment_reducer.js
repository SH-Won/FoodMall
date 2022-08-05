import { SAVE_COMMENT, GET_COMMENTS } from '../_actions/types';

export default function (state = { commentList: [] }, action) {
    switch (action.type) {
        case SAVE_COMMENT:
            return {
                ...state,
                commentList: [...state.commentList, ...action.payload],
            };
        case GET_COMMENTS:
            return {
                ...state,
                commentList: [...action.payload],
            };
        default:
            return state;
    }
}

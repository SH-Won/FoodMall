import { TEST_GET_POSTS } from '../_actions/types';

const initialState = {
    posts: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_GET_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        default:
            return state;
    }
}

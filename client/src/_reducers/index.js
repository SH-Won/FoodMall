import { combineReducers } from 'redux';
import user from './user_reducer';
import post from './post_reducer';
import comment from './comment_reducer';
import test from './test_reducer';

const rootReducer = combineReducers({
    user,
    post,
    comment,
    test,
});

export default rootReducer;

import{
    UPLOAD_FILES,
    UPLOAD_POST,
    GET_POSTS,
    GET_FIRST_POSTS,
    GET_POST_DETAIL
    
} from '../_actions/types'

export default function(state={images:[],posts:[],postDetail:[]},action){
    switch(action.type){
        case UPLOAD_FILES :
            return{
                ...state, images:[...action.payload.url]
            }
        case UPLOAD_POST :
            return{
                ...state,
            }
        case GET_FIRST_POSTS:
            return{
                ...state, posts:[...action.payload],
                postLength:action.payload.length
            }
        case GET_POSTS:
            return{
                ...state, posts:[...state.posts,...action.payload],
                postLength:action.payload.length
                
            }
        case GET_POST_DETAIL:
            return{
                ...state, postDetail:action.payload
            }
        default : return state;
    }
}
import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {saveComment,getComments} from '../../../_actions/comment_actions';
import Comment from './Presenter/Comment';
import './Comment.css';

const CommentPage = ({postId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const commentList = useSelector(state=>state.comment.commentList);
    
    useEffect(()=>{
        dispatch(getComments(postId))
        
    },[])


    const onSubmitComment = (commentValue,commentId)=>{
       
       let variable ={};
       !commentId ?
        ( variable={
             writer: user && user.userData._id,
            value:commentValue,
            postId:postId
        } ):
        (variable ={
            writer:user && user.userData._id,
            value:commentValue,
            postId:postId,
            reply:commentId
        });

        console.log(variable);
        dispatch(saveComment(variable))


    }

    return (
        <div className="comment-wrap">
            <Comment 
            commentList={commentList} 
            writer={user.userData && user.userData._id}
            onSubmitComment={onSubmitComment}/>
           
        </div>
    )
}

export default CommentPage

import React,{useEffect, useState} from 'react'
import CommentForm from './CommentForm';

const RootComment = ({comment,onSubmitComment}) => {
    const [ReplyCommentValue,setReplyCommentValue]=useState('');
    const [ShowReply,setShowReply]=useState(false);

    const onChangeReplyCommentValue = (e)=>{
        setReplyCommentValue(e.target.value);
    }
    const handleShowReply = ()=>{
        
        setShowReply(!ShowReply);
    }
    
    useEffect(()=>{
        setShowReply(false);
        setReplyCommentValue('');
    },[onSubmitComment])


    return (
        <div className="comment-container" >
            <div className="comment-info">
              <img src={comment.writer.image}/>

              <ul className="comment">
                <li>{comment.writer.name}</li>
                <li>{comment.value}</li>
                <button onClick={handleShowReply}>답글달기</button>
            </ul>
            </div>

            
            
            
            {ShowReply && 
            <CommentForm 
                         commentValue={ReplyCommentValue} 
                         onChangeCommentValue={onChangeReplyCommentValue}
                         commentId={comment._id} 
                         onSubmitComment={onSubmitComment}
                         setCommentValue={setReplyCommentValue}
            />
            }
        </div>

    )
}

export default RootComment
{}
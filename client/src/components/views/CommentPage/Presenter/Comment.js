import React,{useState,useEffect} from 'react'
import ReplyComment from './ReplyComment';
import CommentForm from './CommentForm';
import RootComment from './RootComment';


const Comment = ({commentList,onSubmitComment}) => {
    const [CommentValue,setCommentValue]=useState('');
    const onChangeCommentValue =(e)=>{
        setCommentValue(e.target.value);
    }
    useEffect(()=>{
        setCommentValue('');

    },[onSubmitComment])
    
    const renderComment = commentList && commentList.map((comment,index)=>(
        !comment.reply &&
            <div key={index} className="root-comment-container" >
            <RootComment comment={comment} onSubmitComment={onSubmitComment} />
            <ReplyComment 
            commentList={commentList} 
            rootCommentId={comment._id} 
            onSubmitComment={onSubmitComment}/>

             </div>
    ))
    
    return (
        <div>
            <CommentForm 
                         commentValue={CommentValue} 
                         onSubmitComment={onSubmitComment} 
                         onChangeCommentValue={onChangeCommentValue}
                         setCommentValue={setCommentValue}
            />
        <div className="comment-all">
            {renderComment}
        </div>
        
        </div>
    )
}

export default Comment

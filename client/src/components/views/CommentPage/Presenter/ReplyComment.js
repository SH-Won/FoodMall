import React,{useEffect,useState} from 'react'
import RootComment from './RootComment';

const ReplyComment = ({commentList,rootCommentId,onSubmitComment}) => {
   
    const [replyCommentNumber,setReplyCommentNumber]=useState();
    const [ShowReply,setShowReply]=useState(false);

    useEffect(()=>{
        let number = 0;

        commentList && commentList.forEach(comment=>{
            if(comment.reply ===rootCommentId)
                number++;
        })

        setReplyCommentNumber(number);

    },[commentList])
    
    const showReplyComment = ()=>{
         
         setShowReply(!ShowReply);
    }
    const renderReplyComment = (rootCommentId) =>(
        commentList && commentList.map((comment,index)=>(
            comment.reply === rootCommentId &&
            <div key={index} className="reply-comment-container">
            <RootComment comment={comment} onSubmitComment={onSubmitComment} />
            <ReplyComment 
            commentList={commentList} 
            rootCommentId={comment._id} />
  
            </div>
        ))

    )

    return (
        <>
            <p className="show-reply"onClick={showReplyComment}>답글 {replyCommentNumber} 개 보기</p>
            {ShowReply &&
             renderReplyComment(rootCommentId)
            }
        </>
    )
}

export default ReplyComment

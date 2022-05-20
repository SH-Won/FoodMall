import React,{useMemo} from 'react'
import RootComment from './RootComment';
import ReplyComment from './ReplyComment';

const CommentList = (props) => {
    const {commentList,userData,postId,isReply} =props;
    
    const renderCommentList = useMemo(()=>{
        return isReply ? 
        
         commentList.map(comment => (
            
            
              <div key={comment._id} style={{margin:'1rem 0 0 2rem'}}>
                <RootComment comment={comment} userData={userData} postId={postId}/>
                <ReplyComment  parentCommentId={comment._id} postId={postId} />
              </div>
        )) :

           commentList.map(comment => (
                !comment.reply &&
            <div key={comment._id} className="single-comment">
            <RootComment comment={comment} userData={userData} postId={postId}/>
            <ReplyComment  parentCommentId={comment._id} postId={postId} />
            </div>
         ))
            
         
         },[commentList])

    return (
      
        <div className="comment-wrap">
          
          {renderCommentList}
            
        </div>
    )
}

export default CommentList

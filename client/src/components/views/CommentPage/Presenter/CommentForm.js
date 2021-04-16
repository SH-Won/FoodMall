import React from 'react'


const CommentForm = ({commentValue,setCommentValue,onSubmitComment,onChangeCommentValue,commentId}) => {

    console.log(commentId);
    return (
            <div className="comment-form-container" >
            <form  
                    onSubmit={(e)=>{e.preventDefault(); onSubmitComment(commentValue,commentId); }} className="comment-form">

                <textarea value={commentValue} onChange={onChangeCommentValue}/>
                <button onClick={(e)=>{e.preventDefault(); onSubmitComment(commentValue,commentId); }} >댓글 달기</button>

            </form>
            </div>
       
    )
}

export default CommentForm

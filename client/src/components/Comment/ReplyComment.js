import React,{useState} from 'react'
import {useSelector} from 'react-redux';
import CommentList from './CommentList';



const ReplyComment = (props) => {
    console.log('replyComment Component');
    const [open,setOpen]=useState(false);
    
    const {parentCommentId,postId} = props;
    const {userData} = useSelector(state=>state.user);
    const {commentList} = useSelector(state => state.comment);
    const replyCommentList=commentList.filter(comment => comment.reply === parentCommentId);

    const handleOpenReply = () =>{
        setOpen(open => !open)
    }

    return (
        <div>
            <span onClick={handleOpenReply}> 
              답글 {replyCommentList.length} 개 보기
            </span>
            <div className={open ? "reply-comment act" : "reply-comment"}>
              <CommentList commentList={replyCommentList} userData={userData} postId={postId} isReply={true}/>
            </div>
        </div>
    )
}

export default ReplyComment

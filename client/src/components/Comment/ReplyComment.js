import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import RootComment from './RootComment';

const ReplyComment = (props) => {

    const [open,setOpen]=useState(false);
    
    const {parentCommentId,postId} = props;
    const {userData} = useSelector(state=>state.user);
    const {commentList} = useSelector(state => state.comment);
    const replyCommentList=commentList.filter(comment => comment.reply === parentCommentId);
 
    const handleOpenReply = () =>{
        setOpen(open => !open)
    }

    console.log(commentList);
    console.log(replyCommentList)

    const renderCommentList = () =>
        replyCommentList.map(comment => (
            
            <div key={comment._id} >
            <RootComment comment={comment} userData={userData} postId={postId}/>
            <ReplyComment  parentCommentId={comment._id} postId={postId}/>
            </div>
        ))
    

    return (
        <div>
            <span onClick={handleOpenReply}>답글 {replyCommentList.length} 개 보기</span>
            {open && renderCommentList()}
            
        </div>
    )
}

export default ReplyComment

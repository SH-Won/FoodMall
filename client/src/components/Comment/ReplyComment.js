import React,{useState,useEffect,useCallback,useMemo} from 'react'
import {useSelector} from 'react-redux';
import CommentList from './CommentList';
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

    console.log('replyCommentPage');

    // const renderCommentList = useMemo(()=>(
    //     replyCommentList.map(comment => (
    //         <div key={comment._id} style={{margin:'1rem 0 0 2rem'}}>
    //         <RootComment comment={comment} userData={userData} postId={postId}/>
    //         <ReplyComment  parentCommentId={comment._id} postId={postId}/>
    //         </div>
    //     ))
    // ),[replyCommentList])
    
    

    return (
        <div style={{}}>
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

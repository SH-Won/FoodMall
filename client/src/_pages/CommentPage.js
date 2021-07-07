import React,{useState,useEffect,useMemo} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import CommentForm from '../components/Comment/CommentForm';
import RootComment from '../components/Comment/RootComment';
import {getComments, saveComment} from '../_actions/comment_actions';
import '../styles/CommentPage.css';
import ReplyComment from '../components/Comment/ReplyComment';
import Layout from '../components/Utill/Layout';
import CommentList from '../components/Comment/CommentList';
const CommentPage = ({match}) => {
    
    const dispatch = useDispatch();
    const {userData} = useSelector(state=>state.user);
    const {commentList} =useSelector(state => state.comment);
    const postId = match.params.postId;
    const [commentValue,setCommentValue] = useState('');
    const handleChangeComment = (e)=>{
        setCommentValue(e.target.value);
    }
    const onSubmitComment = (e) =>{
        e.preventDefault();
        let variable ={
            postId,
            value:commentValue,
            writer:userData._id
        }
        dispatch(saveComment(variable))
        setCommentValue('');

    }
    useEffect(()=>{
        console.log('comment effect');
        dispatch(getComments(postId))
        

    },[])
    

    let commentProps = {
        value:commentValue,
        onChange:handleChangeComment,
        click:onSubmitComment
    }
    console.log('commentPage');

 

    return (
        <Layout>

            <CommentForm {...commentProps}/>
            <CommentList commentList={commentList} userData={userData} postId={postId} isReply={false}/>
            
        </Layout>
    )
}

export default CommentPage

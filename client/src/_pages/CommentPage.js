import React,{useState,useEffect,useCallback,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import CommentForm from '../components/Comment/CommentForm';
import {getComments, saveComment} from '../_actions/comment_actions';
import '../styles/CommentPage.css';
import Layout from '../components/Utill/Layout';
import LoadingSpinner from '../components/Utill/LoadingSpinner';
import CommentList from '../components/Comment/CommentList';
const CommentPage = ({match}) => {

    const dispatch = useDispatch();
    const {userData} = useSelector(state=>state.user);
    const {commentList} =useSelector(state => state.comment);
    const postId = match.params.postId;
    const [commentValue,setCommentValue] = useState('');
    const [loading,setLoading]=useState(true);
    const handleChangeComment = e => setCommentValue(e.target.value);
    
    const onSubmitComment = useCallback((e) =>{
        e.preventDefault();
        let variable ={
            postId,
            value:commentValue,
            writer:userData._id
        }
        dispatch(saveComment(variable))
        setCommentValue('');

    },[commentValue])

    useEffect(()=>{
        dispatch(getComments(postId))
        .then(response => setLoading(false))
    },[])
    

    let commentProps = {
        style:{
             margin:'1.5rem'
        },
        value:commentValue,
        onChange:handleChangeComment,
        click:onSubmitComment
    }
     
    if(loading){
        let loadingStyle={
            marginTop:'2rem',
        }
        return <LoadingSpinner {...loadingStyle}/>
    }
 

    return (
        <Layout>
            <CommentForm {...commentProps}/>
            <CommentList commentList={commentList} userData={userData} postId={postId} isReply={false}/>
        </Layout>
    )
}

export default CommentPage

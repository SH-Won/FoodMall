import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import Button from '../Utill/Button';
import CommentForm from './CommentForm';

import {saveComment} from '../../_actions/comment_actions'


const RootComment = (props) => {
    const dispatch = useDispatch();
    const {comment,userData,postId} = props;
    const [open,setOpen]=useState(false);
    const [commentValue,setCommentValue]=useState('')

    const handleOpenForm = () =>{
        setOpen(open => !open);
    }
    const onChangeCommentValue =(e)=>{
        setCommentValue(e.target.value);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        let variable={
            writer:userData._id,
            value:commentValue,
            reply:comment._id,
            postId
        }
        dispatch(saveComment(variable))
        setCommentValue('')

    }

    const buttonProps = {
        click:handleOpenForm,
        name:'답글 달기',
        style:{
            borderRadius:'1rem',
            backgroundColor:'aliceblue',
            color:'black',
            width:'20%',
            marginTop:'.5rem'
        }
    }
    const commentFormProps ={
        value:commentValue,
        onChange:onChangeCommentValue,
        click:onSubmit

    }


    return (
        <div className="root-comment-container">
            <div className="root-comment-user">
                <img src={comment.writer.image}/>
                <span>{comment.writer.name}</span>
            </div>
            <p className="root-comment-value">
                {comment.value}
            </p>
            <Button {...buttonProps} />
            {open && <CommentForm {...commentFormProps}/>} 
        </div>
    )
}

export default RootComment

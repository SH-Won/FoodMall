import React from 'react'
import TextArea from '../Utill/TextArea';
import Button from '../Utill/Button';

const CommentForm = (props) => {
    const {value,onChange,click,style} =props;
    console.log('commentForm');
    return (
        <form className="comment-form" style={{...style}} onSubmit={click}>
           
              <TextArea value={value} onChange={onChange} style={{width:'70%'}}/>
              <Button name="댓글 달기" style={{width:'20%',backgroundColor:"blue"}} click={click}/>
        </form>
    )
}

export default CommentForm

import React from 'react'
import TextArea from '../Utill/TextArea';
import Button from '../Utill/Button';

const CommentForm = (props) => {
    const {value,onChange,click} =props;
    console.log(props);
    
    return (
        <form className="comment-form" onSubmit={click}>
           <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
              <TextArea value={value} onChange={onChange}/>
              <Button name="댓글 달기" style={{width:'15%',backgroundColor:"blue"}} click={click}/>
           </div>
        </form>
    )
}

export default CommentForm

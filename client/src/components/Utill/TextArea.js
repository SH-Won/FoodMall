import React from 'react'

const TextArea = (props) => {
    return (
        <div style={{textAlign:'center'}}>
        <textarea
            className="textarea"
            value={props.value}
            onChange={props.onChange}
            placeholder="입력하세요" 
              
        />
        </div>
    )
}

export default TextArea

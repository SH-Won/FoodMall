import React from 'react'

const TextArea = (props) => {
    return (
        // <div style={{textAlign:'center',width:'80%'}}>
        <textarea
            className="textarea"
            style={props.style}
            value={props.value}
            onChange={props.onChange}
            placeholder="입력하세요" 
              
        />
        // </div>
    )
}

export default TextArea

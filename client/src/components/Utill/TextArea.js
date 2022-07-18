import React from 'react'

const TextArea = (props) => {
    return (
        <textarea
            className="textarea"
            style={props.style}
            value={props.value}
            onChange={props.onChange}
            placeholder="입력하세요" 
              
        />
    )
}

export default TextArea

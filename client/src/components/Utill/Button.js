import React from 'react'

const Button = (props) => {
    return (
        <button 
            className="button" 
            onClick={props.click && props.click}
            style={props.style}
            >
            {props.name}
        </button>
        
    )
}
Button.defaultProps ={
    style:{
        
    }
   
}

export default Button

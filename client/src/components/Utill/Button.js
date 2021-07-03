import React from 'react'

const Button = (props) => {
    return (
        <div style={props.style}>
        <button className="button" onClick={props.click && props.click}>
            {props.name}
        </button>
        </div>
    )
}
Button.defaultProps ={
    style:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'.5rem',
    }
}

export default Button

import React from 'react'

const Button = (props) => {
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
        <button className="button" onClick={props.click && props.click}>
            {props.name}
        </button>
        </div>
    )
}

export default Button

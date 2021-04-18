import React,{useState} from 'react'

const Pagination = ({pages,changePage}) => {
    
    
    
    
    
    return (
        <div>
            <ul style={{listStyle:'none',display:'flex',padding:'0',margin:'0'}}>
                {pages.map(number=>(
                    <li key={number} onClick={()=>changePage(number)}>{number}</li>
                ))}

            </ul>
            
        </div>
    )
}

export default Pagination

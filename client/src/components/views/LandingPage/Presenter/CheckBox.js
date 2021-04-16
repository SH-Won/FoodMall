import React from 'react'

const CheckBox = ({category,isChecked,toggleChecked}) => {


    return (
        <div className="checkbox-wrap">
            <ul className="checkbox-list">
            {category && category.map((option,index)=>(
                <li key={option._id}>
                <input type='checkbox'
                       
                       value={option._id}
                       onChange={()=>toggleChecked(option._id)}
                       checked={isChecked.indexOf(option._id) === -1 ? false :true }/> 
                {option.name}
                </li>
                
            ))}
            </ul>
            
        </div>
    )
}

export default CheckBox
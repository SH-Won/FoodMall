import React,{useMemo} from 'react'

const CheckBox = React.memo( ({category,isChecked,toggleChecked}) => {

    

    //const {category,isChecked,toggleChecked} = props;

    console.log('체크박스');

    return (
        <div className="checkbox-wrap">
            
            <ul className="checkbox-list">
            {category && category.map((option,index)=>(
                <li key={option._id}>
                <input type='checkbox'       
                       value={option._id}
                       onChange={()=>toggleChecked(option._id)}
                       checked={isChecked.indexOf(option._id) === -1 ? false :true }/>
                &nbsp;
                {option.name}
                </li>
                
            ))}
            </ul>
            
        </div>
    )
})



export default React.memo(CheckBox)

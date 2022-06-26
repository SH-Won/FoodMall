import React,{useEffect,useRef} from 'react'
import {Link} from 'react-router-dom';

const TabMenu = ({match}) => {
    const list = useRef();

    useEffect(()=>{
        let pathArray = location.pathname.split('/');
        let checkPath = pathArray[pathArray.length-1];
        let path = checkPath === match.params.postId ? '/' : checkPath;


        // switch(path){
        //     case match.params.postId :
        //         return list.current.children[0].style.border='1px solid red'

        // }

        list.current.childNodes.forEach((child,index) =>{
            if (child.attributes.dataset.value === path){
                child.classList.add('act');

                if(index === 0){
                    child.style.borderLeft='0';
                }
                
                else if(index === list.current.children.length -1){
                    child.style.borderRight='0';
                }
            }
            
        })
        
         

    },[])

    const handleClick = (e) =>{
        if(e.target.nodeName !== 'A') return
        e.target.parentElement.parentElement.childNodes.forEach(child => child.classList.remove('act'));
        e.target.parentElement.classList.add('act');

        if(e.target.parentElement === e.target.parentElement.parentElement.children[0])
          e.target.parentElement.style.borderLeft = '0';
          if(e.target.parentElement === e.target.parentElement.parentElement.children[2])
          e.target.parentElement.style.borderRight = '0';
        
    }
    return (
        <ul className="tab-menu" onClick={handleClick} ref={list}>
            <li className="tab-item" dataset="/"><Link to={`${match.url}`}>상세정보</Link></li>
            <li className="tab-item" dataset="board"><Link to={`${match.url}/board`}>제품목록</Link></li>
            <li className="tab-item" dataset="comment"><Link to={`${match.url}/comment`}>댓글</Link></li>
        </ul>
    )
}

export default TabMenu

import React,{useState,useEffect} from 'react'
import {Route,Switch,Link,BrowserRouter} from 'react-router-dom';
import Tab_Board from './Tab_Board';
import Tab_Detail from './Tab_Detail';
import Tab_Contact from './Tab_Contact';
import CommentPage from '../../CommentPage/CommentPage';
import './Tab.css';


const Tab = (props) => {
    const {match,postId,post,allPosts} = props;
    const [Component,setComponent]= useState()
    const [Current,setCurrent]=useState(1)

    
    useEffect(()=>{
           setComponent(ComponentArray[0].component);
    },[post])
    
    const ComponentArray = [
        {
            id:1,
            component:<Tab_Detail post={post}/>,
            name:'상세보기'

        },
        {
            id:2,
            component:<Tab_Board posts={allPosts}/>,
            name:'보드'
        },
        {
            id:3,
            component:<CommentPage postId={postId}/>,
            name:'코멘트'
        }
        
        ];

   
    
    function loadComponent(item){
        setComponent(item.component)
        setCurrent(item.id);

    }
   
    

    return (
        
        <section className="tab">
            <ul className="tab-menu">
                {ComponentArray.map(item=>(
                    <li 
                    key={item.id} 
                    onClick={()=>loadComponent(item)}
                    className={Current === item.id ? 'current': ''}
                    > 
                        {item.name}
                    </li>
                ))}
            </ul>
            
            <div className="tab-component">
            {Component && Component}
            </div>
        </section>
        
    )
}

export default Tab

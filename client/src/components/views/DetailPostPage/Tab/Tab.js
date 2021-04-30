import React,{useState,useEffect} from 'react'
import {Route,Switch,Link,BrowserRouter} from 'react-router-dom';
import Tab_Board from './Tab_Board';
import Tab_Detail from './Tab_Detail';
import Tab_Contact from './Tab_Contact';
import CommentPage from '../../CommentPage/CommentPage';
import './Tab.css';


const Tab = (props) => {
    const {match,postId,post} = props;
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
            component:<Tab_Board/>,
            name:'보드'
        },
        {
            id:3,
            component:<CommentPage postId={postId}/>,
            name:'코멘트'
        }
        
        ];

    const route = <>
    <ul>
                <li><Link to={`${match.url}`}>코맨트</Link></li>
                <li><Link to={`${match.url}`}>보드</Link></li>
                <li><Link to={`${match.url}`}>컨택</Link></li>
            </ul>
                
                <Route exact path={`${match.url}`} component={Tab_Detail} />
                <Route exact path={`${match.url}`} component={Tab_Board} />
                <Route exact path={`${match.url}`} component={Tab_Contact} />

            
             </>
    
    function loadComponent(item){
        setComponent(item.component)
        setCurrent(item.id);

    }
   
    const a = <ul className="tab-menu">
    <li  onClick={()=>{loadComponent(<Tab_Detail/>)}}>상세정보</li>
    <li  onClick={()=>{loadComponent(<Tab_Board/>)}}>보드</li>
    <li  onClick={()=>{loadComponent(<CommentPage postId={postId}/>)}}>코맨트</li>
</ul>

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

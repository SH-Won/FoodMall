import React,{useState,useEffect} from 'react'

import TabBoard from './Presenter/TabBoard';
import TabDetail from './Presenter/TabDetail';
import CommentPage from '../../CommentPage/CommentPage';
import './Tab.css';


const Tab = (props) => {
    const {postId,post,allPosts} = props;

    const [Component,setComponent]= useState()
    const [Current,setCurrent]=useState(1)

    const [currentPage,setCurrentPage]=useState(1);

    
    useEffect(()=>{
        console.log('tab useEffect');
           setComponent(ComponentArray[0].component);


    },[post])

    const changeCurrentPage = (page) =>{
        console.log('changeCurrentPage');
        setCurrentPage(page);
    }

    
    
    const ComponentArray = [
        {
            id:1,
            component:<TabDetail post={post}/>,
            name:'상세보기'

        },
        {
            id:2,
            component:<TabBoard  allPosts={allPosts} currentPage={currentPage} changeCurrentPage={changeCurrentPage}/>,
            name:'전체 상품'
        },
        {
            id:3,
            component:<CommentPage postId={postId}/>,
            name:'코멘트'
        }
        
        ];

   
    
    function loadComponent(item){
        console.log('loadComponent');
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

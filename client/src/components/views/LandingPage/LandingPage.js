import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getPosts,getFirstPosts} from '../../../_actions/post_actions';
import LandingCard from './Presenter/LandingCard';
import CheckBox from './Presenter/CheckBox';
import './Landing.css'
import {category} from './Data';


const LandingPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state=>state.post.posts);
   
    const [Skip,setSkip]=useState(0);
    const [Limit,setLimit]=useState(4);
    const [Filter,setFilter]=useState({category:[]});
    const [isChecked,setIsChecked]=useState([]);


    useEffect(()=>{
        let variable={
            skip:Skip,
            limit:Limit,
            filter:Filter
        }
        
        dispatch(getFirstPosts(variable))
    },[])

    
    const getMorePosts =()=>{
        let skip = Skip+Limit;
        let variable={
          skip : skip,
          limit: Limit,
          filter:Filter

        }
         dispatch(getPosts(variable));

         setSkip(skip)
         
    }
    const toggleChecked = (value)=>{
        let checkedArray = [...isChecked];
        let currentIndex = isChecked.indexOf(value)

        if(currentIndex === -1){
            checkedArray.push(value);
        }
        else{
            checkedArray.splice(currentIndex,1);
        }
        setIsChecked(checkedArray);
        
        getCheckedPosts(checkedArray,'category');


    }
    const getCheckedPosts = (filter,category)=>{
        let filterArray = {...Filter};

        filterArray[category] = filter;
        setFilter(filterArray);

        let variable={
            skip:0,
            limit:Limit,
            filter:filterArray
        }
        dispatch(getFirstPosts(variable))

        setSkip(0);
    }

    
    return (
        <div className="landing-wrap">
        <CheckBox category={category} isChecked={isChecked} toggleChecked={toggleChecked}/>
        <LandingCard posts={posts} getMorePosts={getMorePosts}/>
        </div>
    )
}

export default LandingPage

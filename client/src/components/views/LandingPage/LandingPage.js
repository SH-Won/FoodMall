import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getPosts,getFirstPosts} from '../../../_actions/post_actions';
import LandingCard from './Presenter/LandingCard';
import CheckBox from './Presenter/CheckBox';
import './Landing.css'
import {category} from './Data';
import axios from 'axios';
import SearchBar from './Presenter/SearchBar';


const LandingPage = () => {
    const dispatch = useDispatch();
   // const posts = useSelector(state=>state.post.posts);
   
    const [posts,setPosts]=useState([]);
    const [Skip,setSkip]=useState(0);
    const [Limit,setLimit]=useState(3);
    const [Filter,setFilter]=useState({category:[]});
    const [isChecked,setIsChecked]=useState([]);
    const [SearchValue,setSearchValue]=useState('');
    
    const [state,setState]=useState(false);
    const [postSize,setPostSize]=useState();


    useEffect(()=>{
        
        getData()
        .then(data => 
            state ? 
            (
                setPosts([...posts,...data]),
                setPostSize(data.length)
            )
            : 
            (
                setPosts([...data]),
                setPostSize(data.length)
            )
            )

        
    },[Skip,Filter,SearchValue])

    const getData = () =>{
        let skip = Skip;
        let limit = Limit;
        let filter = Filter;
        let searchValue = SearchValue;
        const data = axios.get(`/api/posts/getPosts?skip=${skip}&limit=${limit}&filter=${JSON.stringify(filter)}&searchValue=${searchValue}`)
        .then(response => response.data)

        return data;
    }
    

   
    
    const getMorePosts =()=>{
        setState(true);
        let skip = Skip+Limit;
        let variable={
          skip : skip,
          limit: Limit,
          filter:Filter

        }
        // dispatch(getPosts(variable));

         setSkip(skip)
        
         
    }
    
    const toggleChecked = (value)=>{
        setState(false);
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
       // dispatch(getFirstPosts(variable))

        setSkip(0);
    }
    const searchPosts = (e) =>{
        setState(false);
        setSearchValue(e.target.value);
        
    }

    
    return (
        <div className="landing-wrap">
           
        <CheckBox category={category} isChecked={isChecked} toggleChecked={toggleChecked}/>
        <SearchBar searchPosts={searchPosts} searchValue={SearchValue}/>
        <LandingCard posts={posts} getMorePosts={getMorePosts} postSize={postSize} limit={Limit}/>
        </div>
    )
}

export default LandingPage

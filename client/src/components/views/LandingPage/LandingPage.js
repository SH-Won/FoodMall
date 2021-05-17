import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getPosts,getFirstPosts} from '../../../_actions/post_actions';
import LandingCard from './Presenter/LandingCard';
import CheckBox from './Presenter/CheckBox';
import './Landing.css'
import {category} from './Data';
import axios from 'axios';
import SearchBar from './Presenter/SearchBar';
import {Router,Link,Route,Switch} from 'react-router-dom';




const LandingPage = (props) => {
    const dispatch = useDispatch();
   // const posts = useSelector(state=>state.post.posts);
   
   //  let value = Object.keys(props.match.params).length > 0 && props.match.params.hasOwnProperty('value') ? [props.match.params.value] : [];
    const [posts,setPosts]=useState([]);
    const [allPosts,setAllPosts]=useState([]);
    const [selectPosts,setSelectPosts]=useState([]);
    const [Skip,setSkip]=useState(0);
    const [Limit,setLimit]=useState(4);
    const [Filter,setFilter]=useState({category:[]});
    const [isChecked,setIsChecked]=useState([]);
    const [SearchValue,setSearchValue]=useState('');
    const [filterPosts,setFilterPosts]=useState([]);
    const [state,setState]=useState(false);
    const [postSize,setPostSize]=useState();
    const [categoryTitle,setCategoryTitle]=useState('');
    const [categoryValue,setCategoryValue]=useState();


    
    useEffect(()=>{
        /*
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
        */
       
       getData()
       .then(data => {
           
           if(state){
          //  let select = data.filter(post=> post.category === Number(props.match.params.id));
          //  setSelectPosts([...selectPosts,...select]); 
            setPosts([...posts,...data])
            setPostSize(data.length)
            
           }
           else{
           // let select = data.filter(post=> post.category === Number(props.match.params.id));
           // setSelectPosts([...select]); 
            setAllPosts([...data]);
            let dataArray = data.slice(Skip,Limit);
            setPosts([...dataArray])
            setPostSize(dataArray.length)
            console.log(props.match)
           }
       })
       

      

        
    },[])
    /*
    useEffect(()=>{
        if(Filter['category'].length === 0){
        let array = allPosts.slice(Skip,Skip+Limit);
        setPosts([...posts,...array]);
        setPostSize(array.length);
        }
        else{
            let array = allPosts.filter(post=> Filter['category'].indexOf(String(post.category)) !== -1)
            setPosts([...array.slice(0,Skip+Limit)])
        
        }

    },[Skip])
   */
  /*
    useEffect(()=>{
        if(Filter['category'].length > 0){
        let array = allPosts.filter(post=> Filter['category'].indexOf(String(post.category)) !== -1)
        setPosts([...array.slice(0,Skip+Limit)])
        }
        else{
            let array=allPosts.slice(0,Skip+Limit);
            setPosts([...array]);
        }

    },[Filter])
*/
    

    const getData =  () =>{
        let hasProperty = props.match.params.hasOwnProperty('id');
        let skip = Skip;
        let limit = Limit;
        let filter = hasProperty ? {category:`${props.match.params.id}`} : Filter; 
        let searchValue = SearchValue;
        
        const data =  axios.get(`/api/posts/getPosts?skip=${0}&limit=${100}&filter=${JSON.stringify(filter)}&searchValue=${searchValue}`)
                      .then(response=> response.data)

        return data;
    }
    
    

   
    /*
    const getMorePosts =()=>{
        setState(true);
        let skip = Skip+Limit;
         setSkip(skip)   
    }*/
    const getMorePosts = ()=>{
        setState(true);
        let skip = Skip+Limit;

        if(Filter['category'].length ===0){
        let array = allPosts.slice(skip,skip+Limit);
        setPosts(pre=> [...pre,...array]);
        setPostSize(array.length);
        }

        else{
         let array = allPosts.filter(post => Filter['category'].indexOf(String(post.category)) !==-1)
         let filterArray = array.slice(skip,skip+Limit);
         setPosts((pre)=>[...pre,...filterArray]);
         setPostSize(filterArray.length);


        }

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
        
        return getCheckedPosts(checkedArray,'category');


    }
    const getCheckedPosts = (filter,category)=>{
        
        let filterArray = {...Filter};
        filterArray[category] = filter;
        setFilter(filterArray);
        if(filter.length === 0 ){
            let array = allPosts.slice(0,Limit);
            setPosts(() => [...array]);
            setPostSize(array.length);
            setSkip(0);
            
        }
        else{
            let array = allPosts.filter(post => filter.indexOf(String(post.category)) !== -1);
            let filterArray = array.slice(0,Limit)
            setPosts(()=> [...filterArray]);
            setPostSize(filterArray.length);
            setSkip(0);

        }

        //setSkip(0);
    }

    const searchPosts = (e) =>{
        setState(false);
        setSearchValue(e.target.value);
        
    }
    
    const handleCategory =(value)=>{
       
       /*
        let filter = [...isChecked];
        filter.push(value);
        let filterArray = {...Filter};
        filterArray['category']=filter;

        setFilter(filterArray);
        */
       setCategoryValue(value);
        
    }
   
   
    return (
        <div className="landing-wrap">
           
          <Route exact path='/'>
          <div className="landing-wrap">
               <ul className="landing-menu" >
                   {category.map(value =>(
                       <li key={value._id}><Link  to={`/posts/${value._id}`}>{value.name}</Link></li>
                   ))}
               </ul>
              <CheckBox category={category} isChecked={isChecked} toggleChecked={toggleChecked}/>
              <SearchBar searchPosts={searchPosts} searchValue={SearchValue}/>
              <LandingCard posts={posts} getMorePosts={getMorePosts} postSize={postSize} limit={Limit} title={categoryTitle} {...props}/>
              </div>
          </Route>

             <Route exact path={`/posts/:id`}>
             <LandingCard posts={posts} getMorePosts={getMorePosts} postSize={postSize} limit={Limit} title={categoryTitle} {...props}/>
             </Route>

            

           

           
           
       
        </div>

    )
}

export default LandingPage

import React, { useEffect, useState, useMemo , useCallback } from "react";
import { useDispatch } from "react-redux";
import LandingCard from "./Presenter/LandingCard";
import CheckBox from "./Presenter/CheckBox";
import Carousel1 from "./Presenter/Carousel1";
import "./Landing.css";
import { category } from "./Data";
import axios from "axios";
import SearchBar from "./Presenter/SearchBar";
import { Link, Route } from "react-router-dom";


// useMemo 는 함수가 리턴한 값을 기억함 의존성 배열 필요
// useCallback 은 함수 자체를 기억함 의존성 배열 필요

const LandingPage = (props) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [Filter, setFilter] = useState({ category: [] });
  const [isChecked, setIsChecked] = useState([]);
  const [SearchValue, setSearchValue] = useState("");

  const [state, setState] = useState(false);
  const [postSize, setPostSize] = useState();
  const [categoryTitle, setCategoryTitle] = useState("");

  const historyData = (location,history)=>{
    let data = {
      allPosts:allPosts,
      posts:posts,
      skip:Skip,
      filter:Filter,
      isChecked:isChecked,
      postSize:postSize
    }
    location.state ={ ...data};
    history.replace(undefined,{...data});

  }

 
  useEffect(() => {
    console.log('use Effect');
    const {history, location} = props;
    console.dir(history);
    console.dir(location);

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
       !location.state ?
    getData().then((data) => {
      if (state) {
        //  let select = data.filter(post=> post.category === Number(props.match.params.id));
        //  setSelectPosts([...selectPosts,...select]);
        setPosts([...posts, ...data]);
        setPostSize(data.length);
      } else {
        // let select = data.filter(post=> post.category === Number(props.match.params.id));
        // setSelectPosts([...select]);
        setAllPosts([...data]);
        let dataArray = data.slice(Skip, Limit);
        setPosts([...dataArray]);
        setPostSize(dataArray.length);
        console.log(data);

      }
     
      
    }) :
    (
      setAllPosts(location.state.allPosts),
      setPosts(location.state.posts),
      setSkip(location.state.skip),
      setFilter(location.state.filter),
      setPostSize(location.state.postSize),
      history.replace(undefined,undefined)
    )
  }, [SearchValue]);
  console.dir(window);

     
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

  const getData = () => {
    let hasProperty = props.match.params.hasOwnProperty("id");
    let filter = hasProperty
      ? { category: `${props.match.params.id}` }
      : Filter;
    let searchValue = SearchValue;
    let title = hasProperty
      ? category.find((item) => item._id === props.match.params.id)
      : "";
    hasProperty && setCategoryTitle(title.name);

    const data = axios.get(`/api/posts/getPosts?filter=${JSON.stringify(filter)}&searchValue=${searchValue}`)
                .then((response) => response.data);

      return data;
  };

  /*
    const getMorePosts =()=>{
        setState(true);
        let skip = Skip+Limit;
         setSkip(skip)   
    }*/

  const getMorePosts = useCallback(() => {
    console.log('get More Posts');
    console.log('skip',Skip);
    setState(true);
    let skip = Skip + Limit;
    

    if (Filter["category"].length === 0) {
      let array = allPosts.slice(skip, skip + Limit);
      setPosts(posts.concat(array));
      setPostSize(array.length);
    } else {
      let array = allPosts.filter(
        (post) => Filter["category"].indexOf(String(post.category)) !== -1
      );
      let filterArray = array.slice(skip, skip + Limit);
      setPosts((pre) => [...pre, ...filterArray]);
      setPostSize(filterArray.length);
    }

    setSkip(skip);
  },[posts,Filter]);

  

  const toggleChecked = useCallback((value) => {
    console.log('toogleChecked');
    setState(false);
    console.log(isChecked);

    let checkedArray = [...isChecked];
    let currentIndex = isChecked.indexOf(value);

    if (currentIndex === -1) {
      checkedArray.push(value);
    } else {
      checkedArray.splice(currentIndex, 1);
    }
    setIsChecked(checkedArray);

    getCheckedPosts(checkedArray, "category");

    

  },[isChecked,allPosts]);
  

  
  const getCheckedPosts = (filter, category) => {
    console.log('getCheckedPosts');
    let filterArray = { ...Filter };
    filterArray[category] = filter;
    setFilter(filterArray);

    if (filter.length === 0) {
      let array = allPosts.slice(0, Limit);
      setPosts(() => [...array]);
      setPostSize(array.length);
      setSkip(0);
    } else {
      let array = allPosts.filter(
        (post) => filter.indexOf(String(post.category)) !== -1
      );
      let filterArray = array.slice(0, Limit);
      setPosts(() => [...filterArray]);
      setPostSize(filterArray.length);
      setSkip(0);
    }

    //setSkip(0);
  };

  const searchPosts = useCallback((e) => {
    console.log('searchPosts');
    setState(false);
    setSearchValue(e.target.value);
    /*
    let searchValue = e.target.value.split("");
    console.log(searchValue);
    let titleArray = allPosts.map((post) => post.title);
    console.log(titleArray);
    */
  },[SearchValue]);

  

  return (
    <div className="landing-wrap">
      <Route exact path="/">
        <div className="landing-wrap">
          <ul className="landing-menu">
            {category.map((value) => (
              <li key={value._id}>
                <Link to={`/posts/${value._id}`}>{value.name}</Link>
              </li>
            ))}
          </ul>
          <CheckBox
            category={category}
            isChecked={isChecked}
            toggleChecked={toggleChecked}
          />
          <SearchBar searchPosts={searchPosts} searchValue={SearchValue} />
          <Carousel1 posts={posts}/>
          <LandingCard
            posts={posts}
            getMorePosts={getMorePosts}
            postSize={postSize}
            limit={Limit}
            title={categoryTitle}
            historyData={historyData}
            {...props}
          />
        </div>
      </Route>

      <Route exact path={`/posts/:id`}>
        <LandingCard
          posts={posts}
          getMorePosts={getMorePosts}
          postSize={postSize}
          limit={Limit}
          title={categoryTitle}
          {...props}
        />
      </Route>
    </div>
  );
};

export default LandingPage;

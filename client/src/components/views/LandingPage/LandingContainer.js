import React,{useState,useEffect,useMemo} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getFirstPosts,getPosts} from '../../../_actions/post_actions'
import {category} from './Data'
import CheckBox from './Presenter/CheckBox';
import SearchBar from './Presenter/SearchBar';
import LandingCard from './Presenter/LandingCard';
import InfiniteScroll from '../../../hook/InfiniteScroll';
import useFetch from '../../../hook/useFetch';
import './Landing.css';



const LandingContainer = () => {
    const dispatch = useDispatch();
    const [skip,setSkip]=useState(0);
    const [limit,setLimit]=useState(4);
    const [hasMore,setHasMore]=useState(false);
    const [loading,setLoading]=useState(true);
    
    const {posts,postLength} = useSelector(state => state.post);
    

    useEffect(()=>{
      setLoading(true);
      
      let variable={
        skip,
        limit
      }
      
      dispatch(getPosts(variable))
      .then(response=> setLoading(false))
     
      

    },[skip])

    useEffect(()=>{
      console.log('useEffect HasMore')
      let isMore = postLength === limit
      setHasMore(isMore)

    },[loading])
    
    

    const loadMore = () =>{
      setSkip(skip+limit)
      
    }
    const {lastIndexRef} = InfiniteScroll(loadMore,hasMore,loading);
    
    

   
    console.log(skip);
    console.log('------------------------');
    

    return (
        <div className="landing-wrap">
      
        <div className="landing-wrap">
          {/* <ul className="landing-menu">
            {category.map((value) => (
              <li key={value._id} >
                <Link to={`/posts/${value._id}`}>{value.name}</Link>
              </li>
            ))}
          </ul>
          <ImageSlider posts={posts}/> */}
          {/* <CheckBox
            category={category}
            isChecked={isChecked}
            toggleChecked={toggleChecked}
          /> */}
          {/* <SearchBar searchPosts={searchPosts} searchValue={SearchValue} />
           */}
          <LandingCard
            posts={posts}
            lastIndexRef={lastIndexRef}
            postSize={postLength}
            limit={limit}
          />
          {loading && <div> Loading...</div>}

        </div>

      
      </div>
    )
}

export default LandingContainer

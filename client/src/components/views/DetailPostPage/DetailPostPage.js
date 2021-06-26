import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {addCartItem} from '../../../_actions/user_actions';
import Post_Image from './Presenter/Post_Image';
import Post_Information from './Presenter/Post_Information';
import CartButton from './Presenter/CartButton';
import CommentPage from '../CommentPage/CommentPage';
import './DetailPost.css';
import axios from 'axios';
import Tab from './Tab/Tab';
import {Route} from 'react-router-dom';
import Menu from './Menu'
import TabDetail from './Tab/Presenter/TabDetail';
import TabBoard from './Tab/Presenter/TabBoard';


const DetailPostPage = (props) => {
    const dispatch = useDispatch();
    const postId = props.match.params.postId;
    
    const [post,setPost] = useState()
    const [allPosts,setAllposts]= useState([]);

    const [currentPage,setCurrentPage]=useState(1);
    const [isLoading,setIsLoading]=useState(true);
    
  
    const changeCurrentPage = (page) =>{
        console.log('changeCurrentPage');
        setCurrentPage(page);
    }
    
    console.log('DetailPostPage');
    useEffect(()=>{
        
            document.documentElement.scrollTop =0;
        
        console.log('use Effect');
        getDetailPost()
        .then(data => {
            setPost(data)
            setIsLoading(false);
            return getData()
        })
        .then(data => setAllposts([...data]))
        .catch(err => err)
    },[])
   
   
    const getDetailPost= ()=>{
        const data = axios.get(`/api/posts/getPostDetail?postId=${postId}&type=single`)
        .then(response => response.data[0])

        return data;
    }
    const getData =()=> {
        const data =  axios.get('/api/posts/getPosts')
         .then(response=>response.data);
 
         return data;
     }

   
    const addtoCart =()=>{
        console.log('addTocart');

        if(confirm('장바구니에 담으시겠습니까 ?') ===true) {
        dispatch(addCartItem(postId)) 
        alert('장바구니에 추가했습니다')
        }
        else{
            return
        }
        
    }
    

    const detailRoutes =
            <>
            <Menu {...props}/>
            <Route exact path={props.match.path} render={()=> <TabDetail post={post}/>} />
            <Route path={`${props.match.path}/board`} render={() =><TabBoard  allPosts={allPosts} currentPage={currentPage} changeCurrentPage={changeCurrentPage}/>}/>
            <Route path={`${props.match.path}/comment`} render={()=><CommentPage postId={postId}/>} />
            </>

    const LoadingBar = () => 
    <div style={{textAlign:'center',marginTop:'200px'}}>
        Loading wait...
    </div>
    

    return (
        <>
        {isLoading ?
        (
             LoadingBar()
        )
        :
        (
            <div className="detail-post-wrap">
            
            {post &&
            <div className="wrap-all">
            <Post_Image post={post} />
            <Post_Information post={post}/>
            </div>
            }
            <CartButton addtoCart={addtoCart}/>
            

            <Tab post={post} allPosts={allPosts} postId={postId} match={props.match}/>
            
            
        </div>

        )
        
        }
        </>


       
        
            
    )
}

export default DetailPostPage

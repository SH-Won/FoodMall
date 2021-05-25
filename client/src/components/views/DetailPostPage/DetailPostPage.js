import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getPostDetail} from '../../../_actions/post_actions'
import {addCartItem} from '../../../_actions/user_actions';
import Post_Image from './Presenter/Post_Image';
import Post_Information from './Presenter/Post_Information';
import CartButton from './Presenter/CartButton';
import CommentPage from '../CommentPage/CommentPage';
import './DetailPost.css';
import axios from 'axios';
import Tab from './Tab/Tab';



const DetailPostPage = (props) => {
    const dispatch = useDispatch();
    const postId = props.match.params.postId;
    console.log(props.match);
    const [post,setPost] = useState()
    const [allPosts,setAllposts]= useState([]);
    
    
    
    useEffect(()=>{
        getDetailPost()
        .then(data => {
            setPost(data)
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
/*
    useEffect(()=>{
        post &&
        setCurrentImage(post.images[0]);

    },[post])
    */
   
    const addtoCart =()=>{
        console.log('클릭');

        if(confirm('장바구니에 담으시겠습니까 ?') ===true) {
        dispatch(addCartItem(postId)) 
        alert('장바구니에 추가했습니다')
        }
        else{
            return
        }
        


    }

    const commentPage = <CommentPage postId={postId}/>

    return (
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

export default DetailPostPage

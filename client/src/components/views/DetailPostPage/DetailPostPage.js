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
import {Switch,Route,Link} from 'react-router-dom';
import Tab_Board from './Tab/Tab_Board';



const DetailPostPage = (props) => {
    const dispatch = useDispatch();
    const postId = props.match.params.postId;
    console.log(props.match);
    const [post,setPost] = useState()
    
    //const [CurrentImage,setCurrentImage]=useState();
    
    useEffect(()=>{
        getDetailPost()
        .then(data => setPost(data))
    },[])
   // const post = useSelector(state=>state.post.postDetail[0]);
   
    const getDetailPost= ()=>{
        const data = axios.get(`/api/posts/getPostDetail?postId=${postId}&type=single`)
        .then(response => response.data[0])

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

        dispatch(addCartItem(postId))

        alert('장바구니에 추가했습니다')
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
            

            <Tab post={post} postId={postId} match={props.match}/>
            
                <ul>
                    <li><Link to={`${props.match.url}`}>코멘트</Link></li>
                    <li><Link to={`${props.match.url}/board`}>보드</Link></li>
                </ul>
                
                
                <Route exact path={`${props.match.path}`} component={CommentPage}/>
                <Route exact path={`${props.match.path}/board`} component={Tab_Board}/>
                
            
        </div>
        
            
    )
}

export default DetailPostPage

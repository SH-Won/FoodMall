import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getPostDetail} from '../../../_actions/post_actions'
import {addCartItem} from '../../../_actions/user_actions';
import Post_Image from './Presenter/Post_Image';
import Post_Information from './Presenter/Post_Information';
import CartButton from './Presenter/CartButton';
import CommentPage from '../CommentPage/CommentPage';
import './DetailPost.css';


const DetailPostPage = (props) => {
    const dispatch = useDispatch();
    const postId = props.match.params.postId;
    
    const [CurrentImage,setCurrentImage]=useState();
    
    useEffect(()=>{

        dispatch(getPostDetail(postId));
    },[])
    const post = useSelector(state=>state.post.postDetail[0]);
   

    useEffect(()=>{
        post &&
        setCurrentImage(post.images[0]);

    },[post])
    
    const selectImage = (image)=>{
        setCurrentImage(image);

    }
    const addtoCart =()=>{
        console.log('클릭');

        dispatch(addCartItem(postId))

        alert('장바구니에 추가했습니다')
    }

    return (
        <div className="detail-post-wrap">
            
            {post &&
            <div className="wrap-all">
            <Post_Image images={post.images} currentImage={CurrentImage} selectImage={selectImage} />
            <Post_Information post={post}/>
            </div>
            }
            <CartButton addtoCart={addtoCart}/>
            <CommentPage postId={postId}/>

        </div>
    )
}

export default DetailPostPage

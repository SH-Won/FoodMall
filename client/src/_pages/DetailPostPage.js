import React,{useState,useEffect} from 'react'
import {Route} from 'react-router-dom';
import useFetch from '../hook/useFetch';
import {useDispatch} from 'react-redux';
import {getPostDetail} from '../_actions/post_actions';
import {addUserCartItem} from '../_actions/user_actions';
import LoadingSpinner from '../components/Utill/LoadingSpinner';
import Button from '../components/Utill/Button';
import '../styles/DetailPostPage.css';

import CommentPage from './CommentPage';
import Information from '../components/DetailPost/Information';
import TabMenu from '../components/DetailPost/TabMenu';
import TabDetail from '../components/DetailPost/TabDetail';
import TabBoard from '../components/DetailPost/TabBoard';
import TabComment from '../components/DetailPost/TabComment';
import Tab from '../components/DetailPost/Tab';
import SideRecommend from '../components/SideRecommend/SideRecommend';
const DetailPostPage = (props) => {
    const dispatch =useDispatch();
    const query = props.match.params.postId;
    const {posts:post,loading} = useFetch([getPostDetail],query);
    const price = post[0] && post[0].price.split(',').join('');
    const [quantity,setQuantity]=useState(1);
    const [totalPrice,setTotalPrice]=useState();
   

     useEffect(()=>{
        document.documentElement.scrollTop =0;
         setTotalPrice(pre => parseInt(price,10).toLocaleString('ko-KR'))
         
     },[post])
 
    const loadingStyle = {
        display:'flex',
        width:'100%',
        height:'100vh',
        justifyContent:'center',
        alignItems:'center'
    }
    
    
    const handleQuantity = (e)=>{
        setQuantity(e.target.value);
        setTotalPrice(pre => Number(price) * e.target.value)

    }
    const addToCart = () =>{
        let variable = {
            postId:query,
            quantity:Number(quantity)
        }
        dispatch(addUserCartItem(variable))
    }
    
  
    
    if(loading) return <LoadingSpinner {...loadingStyle}/>

    return (
        <div style={{position:'relative'}}>
            
            <SideRecommend />
            <Information post={post[0]} handleQuantity={handleQuantity} totalPrice={totalPrice}/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'.5rem'}}>
            <Button name="장바구니" click={addToCart}/>
            </div>

            <TabMenu match={props.match}/>
             <Route exact path={props.match.path} >
                <TabDetail post={post} />
             </Route>
             <Route exact path={`${props.match.path}/board`} >
                  <TabBoard/>
             </Route>
             <Route exact path={`${props.match.path}/comment`} component={CommentPage}/>
                 
                  {/* <Route path={`${props.match.path}/:name`} component={Tab}/>
                 */}
            
            
            
        </div>
    )
}

export default DetailPostPage

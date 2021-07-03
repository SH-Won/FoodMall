import React,{useState,useEffect} from 'react'
import {Route} from 'react-router-dom';
import useFetch from '../hook/useFetch';
import {useDispatch} from 'react-redux';
import {getPostDetail} from '../_actions/post_actions';
import {addUserCartItem} from '../_actions/user_actions';
import LoadingSpinner from '../components/Utill/LoadingSpinner';
import Button from '../components/Utill/Button';
import '../styles/DetailPostPage.css';

import Information from '../components/DetailPost/Information';
import TabMenu from '../components/DetailPost/TabMenu';
import TabDetail from '../components/DetailPost/TabDetail';
import TabBoard from '../components/DetailPost/TabBoard';
import TabComment from '../components/DetailPost/TabComment';
import Tab from '../components/DetailPost/Tab';
const DetailPostPage = (props) => {
    const dispatch =useDispatch();
    const query = props.match.params.id;
    const {posts:post,loading} = useFetch([getPostDetail],query);
    const price = post[0] && post[0].price.split(',').join('');
    const [quantity,setQuantity]=useState(1);
    const [totalPrice,setTotalPrice]=useState();
    
     useEffect(()=>{
         setTotalPrice(price)

     },[post])
 
    const loadingStyle = {
        display:'flex',
        width:'100%',
        height:'100vh',
        justifyContent:'center',
        alignItems:'center'
    }
    console.log(quantity)
    
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
        <div>
            <Information post={post[0]} handleQuantity={handleQuantity} totalPrice={totalPrice}/>
            <Button name="장바구니" click={addToCart}/>
            <TabMenu match={props.match}/>
            
            <Route exact path={props.match.path} >
               <TabDetail post={post} />
            </Route>
            <Route path={`${props.match.path}/:name`} component={Tab}/>
                
            
            {/* <Route exact path={`${props.match.path}/board`} >
                 <TabBoard/>
            </Route>
            <Route exact path={`${props.match.path}/comment`} >
                 <TabComment/>
            </Route> */}
            
            
            
        </div>
    )
}

export default DetailPostPage
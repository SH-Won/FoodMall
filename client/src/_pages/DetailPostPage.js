import React from 'react'
import {Route} from 'react-router-dom';
import useFetch from '../hook/useFetch';
import {getPostDetail} from '../_actions/post_actions';
import LoadingSpinner from '../components/Utill/LoadingSpinner';
import '../styles/DetailPostPage.css';

import Information from '../components/DetailPost/Information';
import TabMenu from '../components/DetailPost/TabMenu';
import TabDetail from '../components/DetailPost/TabDetail';
import TabBoard from '../components/DetailPost/TabBoard';
import TabComment from '../components/DetailPost/TabComment';
import Tab from '../components/DetailPost/Tab';
const DetailPostPage = (props) => {

    const query = props.match.params.id;
    const {posts:post,loading} = useFetch([getPostDetail],query);
    
    const loadingStyle = {
        display:'flex',
        width:'100%',
        height:'100vh',
        justifyContent:'center',
        alignItems:'center'
    }
    console.log(post);
    
    if(loading) return <LoadingSpinner {...loadingStyle}/>

    return (
        <div>
            <Information post={post[0]}/>
            
            {/* 상세정보
            물품리스트
            코멘트 */}
            <TabMenu match={props.match}/>
            <Route exact path={props.match.path} component={TabDetail}/>
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

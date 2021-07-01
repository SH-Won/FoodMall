import React from 'react'
import useFetch from '../hook/useFetch';
import {getPostDetail} from '../_actions/post_actions';

const DetailPostPage = (props) => {

    const query = props.match.params.id;
    const {posts:post,loading} = useFetch([getPostDetail],query);

    console.log(post);

    return (
        <div>
            
        </div>
    )
}

export default DetailPostPage

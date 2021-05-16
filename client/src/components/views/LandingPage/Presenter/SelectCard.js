import React from 'react'

const SelectCard = (props) => {
    
    const {posts,match}=props;

    
    //const selectPosts = posts.filter(post=> post.category === match.params.value);

    //console.log(selectPosts);
    console.log(posts);
    return (
        <div>
            <h2>selectCard</h2>
        </div>
    )
}

export default SelectCard

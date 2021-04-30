import React from 'react'

const SearchBar = (props) => {

    const {searchPosts,searchValue} = props;

    return (
        <input onChange={searchPosts} value={searchValue} placeholder="검색"/>
    )
}

export default SearchBar

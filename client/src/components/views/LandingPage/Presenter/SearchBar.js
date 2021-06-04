import React from 'react'

const SearchBar = (props) => {

    const {searchPosts,searchValue} = props;
    console.log("검색 창");

    return (
        <div style={{display:'flex', justifyContent:'flex-end', width:'100%'}}>
        <input style={{marginRight:'30px' }}  onChange={searchPosts} value={searchValue} placeholder="물품을 검색하세요"/>
        </div>
    )
}

export default React.memo(SearchBar)

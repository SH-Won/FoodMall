import React,{useState,useEffect} from 'react'


const TabBoard = (props) => {
    const {allPosts,currentPage,changeCurrentPage} =props;
    
    const [pages,setPages] =useState([]);
    const [boardPosts,setboardPosts]=useState([]);
    const [pageNumber,setPageNumber]=useState();
  //   const [currentPage,setCurrentPage]=useState(1);


    useEffect(()=>{
        let postLength = allPosts.length;
        let pageLength = Math.ceil(postLength / 5 );
        let pages = Array(pageLength).fill().map((v,i)=> Number(i+1));
        let start = (currentPage-1)*5;
        let finish =start+5;
        let currentPosts = allPosts.slice(start,finish);
        setPages([...pages]);
        setboardPosts([...currentPosts]);
        setPageNumber(currentPage);
        console.log('보드');

    },[allPosts,currentPage])

    const handlePage = (page)=>{
        console.log(page);
        let start = (page - 1) * 5;
        let finish = start + 5;
        let currentPosts = allPosts.slice(start,finish);
        console.log(currentPosts)
        setboardPosts(pre => [...currentPosts]);
        
        changeCurrentPage(pre=> page);
        setPageNumber(page);
    }

    return (
        <div className="board-container">
            <ul className="board-posts" style={{listStyle:'none'}}>
            {boardPosts && boardPosts.map(post =>(
             <li key={post._id}> <a href={`/post/${post._id}`}>{post.title}</a></li>
            ))}
            </ul>

            <ul className="page-number">
                {pages && pages.map((page,index)=>(
                    <li 
                    className={pageNumber === page ? 'current' :'' }
                    key={index} onClick={()=>handlePage(page)}>{page}
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default TabBoard

import React,{useState} from 'react'

const Post_Image = ({post}) => {

    const [currentImage,setCurrentImage]=useState(post.images[0]);
    
    const selectImage = (image)=>{
        setCurrentImage(image);

    }
    return (
        <div className="post-image-container">
        {currentImage && 
         <div className="current-img-container">
         <img className="current-img" src={currentImage} />
         </div>
        }
        <div className="select-container">
           {post.images && post.images.map((image,index)=>(
                <div className="select-img-container" key={index} onClick={()=>selectImage(image)}>
                  <img className="select-img" src={image}/>
                </div>
            ))}
            
        </div> 
        </div>
    )
}

export default Post_Image

import React from 'react'

const Post_Image = ({images,currentImage,selectImage}) => {

    return (
        <div className="post-image-container">
        {currentImage && 
         <div className="current-img-container">
         <img className="current-img" src={currentImage} />
         </div>
        }
        <ul className="select-container">
           {images && images.map((image,index)=>(
                <li className="select-img-container" key={index} onClick={()=>selectImage(image)}>
                  <img className="select-img" src={image}/>
                </li>
            ))}
            
        </ul> 
        </div>
    )
}

export default Post_Image

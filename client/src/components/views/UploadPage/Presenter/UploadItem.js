import React from 'react'
import Dropzone from 'react-dropzone';
import {Icon} from 'antd'

const UploadItem = ({onDrop,removeFile,FileURLs,props}) => {
    console.log(props);
    return (
        <div className="upload_item_container">
            <div className="input_container">
             <Dropzone
               onDrop={onDrop}
               multiple={true}
               maxSize={8000000}
               >
                 {({getRootProps,getInputProps})=>(
                     <div className="input_img" 
                     {...getRootProps()}>
                         <input {...getInputProps()}/>
                         <Icon type="plus" style={{fontSize:'3rem'}} />
                     </div>
                 )}  
               </Dropzone>
               <span>올리고 싶은 이미지를 올리세요</span>
               </div>
               <div className="img_container" >
                  {FileURLs && FileURLs.map((file,index)=>(
                      <div className="img_card" key={index} onClick={()=>removeFile(file)}>
                          <img style={{}} src={file}/>
                      </div>
                  ))}
                  
                 
                  
               </div>
            
        </div>

    )
}

export default UploadItem

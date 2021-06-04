import React  from 'react'
import UploadItem from './UploadItem';



const UploadForm = ({
    onSubmit,onDrop,removeFile,FileURLs,
    Title,Description,Category,select,
    onChangeTitle,onChangeDescription,onChangeCategory
    ,Price,onChangePrice
    }) => {
    
    return (
        <div className="upload_form">
            <form onSubmit={onSubmit}>
              <UploadItem onDrop={onDrop} removeFile={removeFile} FileURLs={FileURLs}/>
              <label name="title">제목</label>
              <textarea value={Title} onChange={onChangeTitle}/>
              <label name="description">설명</label>
              <textarea value={Description} onChange={onChangeDescription}/>
              <label name="price">가격</label>
              <textarea value={Price} onChange={onChangePrice} />
              <br/>
              <select value={Category} onChange={onChangeCategory}>
                  {select.map(item=>(
                      <option key={item.key} value={item.key}>{item.value}</option>
                  ))}
              </select>
              <br/>
              <button style={{width:'15%'}} onClick={onSubmit}>글올리기</button>
            </form> 
        </div>
    )
}

export default UploadForm

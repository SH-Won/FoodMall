import React from 'react'

const Tab_Detail = ({post}) => {
    
    console.log('상세보기');
   const tabDetail = {...post};

    return (
        <section className="tab-detail-post-container">
            <div className="tab-detail-imgs">
            {tabDetail.images && tabDetail.images.map((image,index)=>(
                <div key={index} className="tab-detail-img-container">
                <img  src={image}/>
                </div>
            ))}
           </div>
           <div >

           </div>
        </section>
    )
}

export default Tab_Detail

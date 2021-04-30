import React from 'react'

const Tab_Detail = ({post}) => {
    
    
   const tabDetail = {...post};

    return (
        <section className="tab-detail-post-container">
            <div className="tab-detail-imgs">
            {tabDetail.images && tabDetail.images.map((image,index)=>(
                <img key={index} src={image}/>
            ))}
           </div>
           <div className>

           </div>
        </section>
    )
}

export default Tab_Detail

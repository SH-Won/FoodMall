import React from 'react'
import Carousel from '../Utill/Carousel'

const Information = ({post,handleQuantity,totalPrice}) => {
    return (
        <section className="information-container">

            <div className="carousel">
              <Carousel carouselImages={post.images}/>
            </div>

            <div className="explain">

                <div className="explain-title">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                </div>

                <div className="explain-price">
                    <dl>
                        <dt>판매가</dt>
                        <dd>{post.price} 원</dd>
                    </dl>
                    <dl>
                        <dt>수량</dt>
                        <select onChange={handleQuantity}>
                            {Array.from({length:5},(_,i) => i+1).map((number,index) =>(
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    </dl>
                </div>

                <div className="explain-total">
                    <dl>
                        <dt>총 주문금액</dt>
                        <dd>{totalPrice.toLocaleString('ko-KR')} 원</dd>
                    </dl>

                </div>

            </div>
        </section>
    )
}

export default Information

import React from 'react'
import Carousel from '../Utill/Carousel'

const Information = ({post}) => {

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
                        <dt>추가 토핑</dt>
                        <select>
                            <option >올리브</option>
                            <option >치즈</option>
                        </select>
                    </dl>
                </div>

                <div className="explain-total">
                    <dl>
                        <dt>총 주문금액</dt>
                        <dd>{post.price} 원</dd>
                    </dl>

                </div>

            </div>
        </section>
    )
}

export default Information

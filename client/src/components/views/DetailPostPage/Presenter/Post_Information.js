import React from 'react'

const Post_Information = ({post}) => {

    const table = <table>
    <thead>
      <tr>
          <td>정보</td>
          <td>설명</td>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>제목</td>
            <td>{post.title}</td>
        </tr>
        <tr>
            <td>설명</td>
            <td>{post.description}</td>
        </tr>
        <tr>
            <td>가격</td>
            <td>{post.price}</td>
        </tr>

    </tbody>
</table>

    return (
        <div className="post-information-container">
            <div className="information-right">
                <h2>{post.title}</h2>
                <dl className="post-description">
                    <dt>설명</dt>
                    <dd><span>{post.description}</span></dd>

                </dl>
                <dl className="post-price">
                    <dt>판매가</dt>
                    <dd><span>{post.price} 원</span></dd>

                </dl>
            </div>
            <div className="post-total-price">
                <dl>
                    <dt>총 상품금액</dt>
                    <dd><span>{post.price}</span></dd>
                </dl>
                <dl>
                    <dt>총 주문금액</dt>
                    <dd><span>{post.price}</span></dd>
                </dl>

            </div>
            
        </div>
    )
}

export default Post_Information

import React from 'react'

const Post_Information = ({post}) => {

    return (
        <div className="post-information-container">
            <table>
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
            
        </div>
    )
}

export default Post_Information

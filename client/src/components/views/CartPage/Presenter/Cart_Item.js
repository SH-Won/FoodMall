import React from 'react'

const Cart_Item = ({items,deleteCartItem}) => {

    
    return (
        <div className="cart-item-container">
            <table>
                <thead>
                    <tr>
                        <td>상품</td>
                        <td>제목</td>
                        <td>수량</td>
                        <td>가격</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item,index)=>(
                        <tr key={index}>
                            <td><img className="img" src={item.images[0]}/></td>
                            <td>{item.title}</td>
                            <td>{item.quantity} 개</td>
                            <td>{item.price}</td>
                            <td><button onClick={()=> deleteCartItem(item._id)}>삭제</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default Cart_Item

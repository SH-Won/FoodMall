import React from 'react';
import Button from '../Utill/Button';

const CartItem = props => {
    const { items, deleteCartItem } = props;
    const buttonStyle = {
        width: '60%',
        backgroundColor: 'red',
    };
    return (
        <div className="cart-container">
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
                    {items &&
                        items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="cart-item-img-container">
                                        <img src={item.images[0]} />
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td>{item.quantity} 개</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button name="삭제" style={buttonStyle} click={() => deleteCartItem(item._id)}>
                                        삭제
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartItem;

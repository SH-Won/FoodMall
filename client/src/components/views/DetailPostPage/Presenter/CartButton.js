import React from 'react'

const CartButton = ({addtoCart}) => {
    return (
        <div>
            <button 
            className="cart-button"
            onClick={addtoCart}>
                장바구니
            </button>
        </div>
    )
}

export default CartButton

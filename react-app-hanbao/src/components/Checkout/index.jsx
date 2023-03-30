import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import CheckoutItem from './CheckoutItem'; // 结算页餐品
import Bar from './Bar'; // 底部栏

import CartContext from '../../store/cart-context';

const checkoutRoot = document.getElementById('checkout-root');

const Checkout = (props) => {
    const cartCtx = React.useContext(CartContext);

    return ReactDOM.createPortal(
        <div className='checkout-container'>
            {/* 左上角的关闭按钮 */}
            <div className='checkout-close'>
                <FontAwesomeIcon
                    onClick={() => props.onHide()} // 调用父组件传递的onHide方法，关闭结算页
                    icon={faXmark}
                />
            </div>

            <div className='checkout-mealsDetail'>
                <header className='checkout-header'>
                    <h2>餐品详情</h2>
                </header>

                <div className='checkout-detailItem'>
                    { cartCtx.items.map( detailItem => <CheckoutItem key={detailItem.id} detailItem={detailItem}/> )}
                </div>

                <footer className='checkout-footer'>
                    <p className='checkout-totalPrice'>{cartCtx.totalPrice}</p>
                </footer>
            </div>
            <Bar totalPrice={ cartCtx.totalPrice }/>
        </div>, checkoutRoot
    );
};

export default Checkout;
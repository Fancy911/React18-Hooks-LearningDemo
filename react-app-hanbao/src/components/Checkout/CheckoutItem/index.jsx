import React from 'react';
import Counter from "../../UI/Counter";

import './index.css';

const CheckoutItem = (props) => {
    return (
        <div className='checkout-item'>
            <div className='checkout-item-img'>
                <img src={props.detailItem.img} alt=""/>
            </div>
            <div className='checkout-item-desc'>
                <h2 className='checkout-item-title'>{props.detailItem.title}</h2>
                <div className='checkout-item-priceOuter'>
                    <Counter mealItem={props.detailItem}/>
                    <div className='checkout-item-price'>{props.detailItem.price * props.detailItem.amount}</div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutItem;
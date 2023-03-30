import React from 'react';
import './index.css';

const Bar = (props) => {
    return (
        <div className='bar-container'>
            <div className='bar-totalPrice'>
                <span>合计</span>
                <div className='bar-text'>{props.totalPrice}</div>
            </div>
            <button className='bar-button'>去支付</button>
        </div>
    );
};

export default Bar;
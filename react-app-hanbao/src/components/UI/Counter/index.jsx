import React from 'react';
import './index.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // 引入组件
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons"; // 引入图标

import CartContext from '../../../store/cart-context';

const Counter = (props) => {
    // 获取购物车context
    const cartCtx = React.useContext(CartContext);

    // 点击加号按钮
    const addMealHandler = () => {
        // 调用购物车context的dispatch方法中的新增食物类型的action
        cartCtx.dispatchCartData({ type: 'ADD', mealItem: props.mealItem });    
    };

    // 点击减号按钮
    const subMealHandler = () => {
        // 调用购物车context的dispatch方法中的删除食物类型的action
        cartCtx.dispatchCartData({ type: 'REMOVE', mealItem: props.mealItem });
    };

    return (
        <div className='counter-container'>
            {
                (props.mealItem.amount && props.mealItem.amount !== 0) ? (
                    <>
                        <button
                            className='counter-sub-btn'
                            onClick={subMealHandler}
                        >
                            <FontAwesomeIcon icon={faMinus}/>
                        </button>
                        <span className='counter-amount'>{ props.mealItem.amount }</span>
                    </>
                ) : null
            }
            <button
                className='counter-add-btn'
                onClick={addMealHandler}
            >
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        </div>
    );
};

export default Counter;
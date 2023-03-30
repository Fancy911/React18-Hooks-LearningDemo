import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import MealItem from '../../Meals/MealItem'; // 餐品
import BackDrop from '../../UI/BackDrop'; // 背景遮罩
import Confirm from '../../UI/Confirm'; // 确认框
import CartContext from '../../../store/cart-context';

import './index.css';

const CartDetail = () => {
    const cartCtx = React.useContext(CartContext);
    
    // 设置state：点击清空购物车按钮，设置确认框的显示与隐藏
    const [showConfirm, setShowConfirm] = React.useState(false); 

    const showConfirmHandler = () => {
        setShowConfirm(true);
    };

    // 点击确认框的取消按钮，关闭确认框
    const cancelHandler = (e) => {
        // 阻止事件冒泡，这样点击确认框的取消，不会触发关闭购物车详情页的事件
        // 点击遮罩层也是同理
        e.stopPropagation();
        setShowConfirm(false);
    };

    // 点击确认框的确认按钮，清空购物车
    const okHandler = () => {
        cartCtx.dispatchCartData({type:'CLEAR'});
    };

    return (
        <BackDrop>
            {/* BackDrop仍旧要接收冒泡事件，它还需要能够关闭购物车详情页，所以不能阻止事件冒泡 */}
            {
                showConfirm && <Confirm onCancel={cancelHandler} onOk={okHandler} confirmText={'确认清空购物车吗？'}/>
            }
            <div
                className='cart-detail-container'
                onClick={e => e.stopPropagation()} // 阻止事件冒泡，这样点击购物车详情页部分，不会触发关闭购物车详情页的事件
                // 但是，这样点击购物车详情页的清空购物车按钮，就不会触发清空购物车的事件了
            >
                <header className='cart-detail-header'>
                    <h2 className='cart-detail-title'>餐品详情</h2>
                    <div
                        className='cart-detail-clear'
                        onClick={showConfirmHandler} // 点击清空购物车按钮，显示确认框
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                        <span>清空购物车</span>
                    </div>
                </header>

                <div className='cart-detail-meallist'>
                    {
                        cartCtx.items.map(mealItem =>
                            // 加一个inDetail属性，标识它是在CartDetail中显示的
                            // 不显示描述信息，图片变小
                            <MealItem
                                noDesc
                                key={mealItem.id}
                                mealItem={mealItem}
                            />
                        )
                    }
                </div>
            </div>
        </BackDrop>
    );
};

export default CartDetail;
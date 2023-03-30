import React from 'react';
import './index.css';
import iconImg from '../../assets/bag.png';
import CartContext from '../../store/cart-context'; // 购物车Context
import CartDetail from './CartDetail'; // 购物车详情页 

import Checkout from '../Checkout'; // 结账页面

const Cart = () => {
    const cartCtx = React.useContext(CartContext);

    // 设置购物车详情页的显示与隐藏state
    const [showCartDetail, setShowCartDetail] = React.useState(false);

    // 设置结账页面的显示与隐藏state
    const [showCheckout, setShowCheckout] = React.useState(false);

    // 在Cart购物车组件每次重新渲染的时候，检查一下商品的总数量，如果为0，就隐藏购物车详情页
    // 组件每次重新渲染的时候，组件函数体内的代码都会重新执行一遍，所以会导致死循环 （渲染——> 走下面if里的setState ——> state又变 ——> 又走一遍）
    // 以下代码会报错（Too many re-renders. React limits the number of renders to prevent an infinite loop.）
    // if (cartCtx.totalAmount === 0) {
    //     setShowCartDetail(false);
    // }

    /* useEffect是一个副作用钩子，需要一个函数作为参数
     *
     *   默认情况下，useEffect()中的函数，会在组件渲染完成后调用，
     *       并且是每次渲染完成后都会调用
     *
     *   在useEffect()可以传递一个第二个参数，第二个参数是一个数组，在数组中可以指定 Effect的依赖项
     *       指定后，只有当依赖发生变化时，Effect才会被触发
     *       - 通常会将Effect中使用的所有的局部变量都设置为依赖项
     *           这样一来可以确保这些值发生变化时，会触发Effect的执行
     *       - 但是，像setState()是由钩子函数useState()生成的
     *           useState()会确保组件的每次渲染都会获取到相同setState()对象
     *           所以setState()方法可以不设置到依赖中
     *       - 如果依赖项只设置了一个空数组[]，则意味Effect只会在组件初始化时触发一次
     */
    React.useEffect(() => {
        // 如果购物车里没有商品，就隐藏购物车详情页、结账页面
        if (cartCtx.totalAmount === 0) {
            setShowCartDetail(false);
            setShowCheckout(false)
        }
    }, [cartCtx.totalAmount]);

    // 点击购物车条，显示购物车详情页
    // toggle是取反的意思
    const toggleCartDetailHandler = () => {
        if (cartCtx.totalAmount === 0) {
            setShowCartDetail(false);
            return;
        }
        setShowCartDetail( preState => !preState); // 取反，显示或隐藏
    };

    // 点击去结算按钮，显示结账页面
    const checkoutHandler = () => { 
        if (cartCtx.totalAmount === 0) {
            return;
        }
        setShowCheckout(true);
    }

    // 点击结算页面的叉号，隐藏结账页面
    const hideCheckoutHandler = () => {
        setShowCheckout(false);
    }

    return (
        <div
            className='cart-container'
            onClick={toggleCartDetailHandler}
        >
            {/* 购物车详情页面  */}
            { showCartDetail ? 
                <CartDetail onClose={() => setShowCartDetail(false)}/>  : null
            }

            {/* 结账页面 */}
            { showCheckout && <Checkout onHide={hideCheckoutHandler}/> }

            {/* 购物车图标 */}
            <div className='cart-icon'>
                <img src={iconImg} alt="" />
                {cartCtx.totalAmount === 0 ? null : <span className='cart-total-amount'>{cartCtx.totalAmount}</span>}
            </div>

            {/* 购物车文案 */}
            { cartCtx.totalAmount === 0 ? 
                <p className='cart-total-nomeal'>购物车空空如也</p> : 
                <p className='cart-total-price'>{cartCtx.totalPrice}</p>
            }

            {/* 结算按钮 */}
            <button
                className={ `cart-button ${ cartCtx.totalAmount === 0 ? 'cart-button-disabled' : '' }` }
                onClick={checkoutHandler}
            >去结算</button>
        </div>
    );
};

export default Cart;
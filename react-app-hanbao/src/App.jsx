import React, {useState, useReducer} from 'react';
import Filter from './components/Filter';
import Meals from './components/Meals';
import Cart from './components/Cart';
import CartContext from './store/cart-context'; // 引入CartContext

// 模拟一组食物数据
const MEALS_DATA = [
    {
        id: '1',
        title: '汉堡包',
        desc: '百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！',
        price: 12,
        img: '/img/meals/1.png'
    },
    {
        id: '2',
        title: '双层吉士汉堡',
        desc: '百分百纯牛肉与双层香软芝，加上松软面包及美味酱料，诱惑无人能挡！',
        price: 20,
        img: '/img/meals/2.png'
    },
    {
        id: '3',
        title: '巨无霸',
        desc: '两块百分百纯牛肉，搭配生菜、洋葱等新鲜食材，口感丰富，极致美味！',
        price: 24,
        img: '/img/meals/3.png'
    }, {
        id: '4',
        title: '麦辣鸡腿汉堡',
        desc: '金黄脆辣的外皮，鲜嫩幼滑的鸡腿肉，多重滋味，一次打动您挑剔的味蕾！',
        price: 21,
        img: '/img/meals/4.png'
    }, {
        id: '5',
        title: '板烧鸡腿堡',
        desc: '原块去骨鸡排嫩滑多汁，与翠绿新鲜的生菜和香浓烧鸡酱搭配，口感丰富！',
        price: 22,
        img: '/img/meals/5.png'
    }, {
        id: '6',
        title: '麦香鸡',
        desc: '清脆爽口的生菜，金黄酥脆的鸡肉。营养配搭，好滋味的健康选择！',
        price: 14,
        img: '/img/meals/6.png'
    }, {
        id: '7',
        title: '吉士汉堡包',
        desc: '百分百纯牛肉与香软芝士融为一体配合美味番茄醬丰富口感一咬即刻涌现！',
        price: 12,
        img: '/img/meals/7.png'
    }
];

// 定义Cart的Reducer
const cartReducer = (cartData, action) => {
    // 1. 复制购物车
    const newCartData = {...cartData};
    
    switch (action.type) {
        case 'ADD':
            // 2. 判断：如果购物车中已经有该商品
            if (newCartData.items.find(item => item.id === action.mealItem.id)) {
                action.mealItem.amount += 1;
            }
            else {
                newCartData.items.push(action.mealItem);
                action.mealItem.amount = 1;
            }
            // 3. 更新购物车总数据
            newCartData.totalAmount += 1;
            newCartData.totalPrice += action.mealItem.price;
            return newCartData;
        case 'REMOVE':
            // 2. 减少当前商品的数量
            action.mealItem.amount -= 1;
            // 3. 判断当前商品的数量是否为0，如果为0，则从购物车中删除该商品
            if (action.mealItem.amount === 0) {
                newCartData.items = newCartData.items.filter(item => item.id !== action.mealItem.id);
            }
            // 4. 更新购物车总数据
            newCartData.totalAmount -= 1;
            newCartData.totalPrice -= action.mealItem.price;
            return newCartData;
        case 'CLEAR':
            // 2. 将购物车中的商品数量设置为0
            newCartData.items.forEach(item => item.amount = 0);
            newCartData.items = [];
            newCartData.totalAmount = 0;
            newCartData.totalPrice = 0;
            return newCartData;
        default:
            return cartData;
    }
};

const App = () => {
    // 创建一个state用来存储食物列表
    const [mealsData, setMealsData] = useState(MEALS_DATA);

    // 创建一个reducer，用于存储和更新购物车数据
    const [cartData, dispatchCartData] = useReducer(cartReducer, {
        items: [],
        totalAmount: 0,
        totalPrice: 0
    });

    // 获取搜索框中的值，然后过滤出符合条件的食物列表
    const onFilterMeals = (searchValue) => {
        const newMealsData = MEALS_DATA.filter(item => item.title.includes(searchValue));
        setMealsData(newMealsData);
    };

    return (
        <CartContext.Provider value={{ ...cartData, dispatchCartData }}>
            <div>
                <Filter onFilterMeals={onFilterMeals}/>
                <Meals mealsData={mealsData}/>
                <Cart/>
            </div>
        </CartContext.Provider>
    );
};

export default App;
import React from 'react';
import Counter from '../../UI/Counter';
import './index.css'

/*  
    显示具体的食物信息的Item组件
*/
const MealItem = (props) => {
    return (
        <div className='meal-item-container'>
            {/* 食物图片 */}
            <div className={ props.noDesc ? 'meal-item-img-container-detail' : 'meal-item-img-container'}>
                <img src={props.mealItem.img} alt=''/>
            </div>
            {/* 食物描述 */}
            <div className='meal-item-desc-container'>
                <h2 className='meal-item-desc-title'>
                    {props.mealItem.title}
                </h2>
                { props.noDesc ? null : 
                    <p className='meal-item-desc-detail'>
                        {props.mealItem.desc}
                    </p> 
                }
                <div className='meal-item-desc-price-container'>
                    <span className='meal-item-desc-price-number'>
                        {props.mealItem.price}
                    </span>
                    <Counter
                        mealItem={props.mealItem}
                    />
                </div>
            </div>
        </div>
    );
};

export default MealItem;
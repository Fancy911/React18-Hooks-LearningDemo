import React from 'react';
import MealItem from './MealItem';
import './index.css'

/*  
    食物列表组件
*/
const Meals = (props) => {
    return (
        /*现在将滚动条设置给了Meals*/
        <div className='meals-container'>
            {
                props.mealsData.map (item => 
                    <MealItem 
                        key={item.id} 
                        mealItem={item}
                    />
                )
            }
        </div>
    );
};

export default Meals;
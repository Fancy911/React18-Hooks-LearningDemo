import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

import './index.css'

const Filter = (props) => {
    const [keyword, setKeyword] = useState('');

    // 通过useEffect()来监听keyword的变化
    useEffect(() => {
        // 通过props.onSearch()来将keyword传递给父组件

        // 降低数据传递的频率，避免频繁的传递数据，提高性能和用户体验
        // 用户输入的时候，不要立即传递数据，等用户停止输入一段时间（1s）后，再传递数据
        // 通过setTimeout()来实现，但是这样会导致每次用户输入都会创建一个定时器，这样会导致定时器越来越多，执行次数并没有减少，只是延迟了1s执行
        // 所以，我们需要在每次用户输入的时候，清除上一次的定时器，这样就可以保证每次用户输入都只有一个定时器
        const timer = setTimeout(() => {
            props.onFilterMeals(keyword);
        }, 1000);

        // 在Effect的回调函数中，可以直接返回一个函数，这个函数就是Effect的清除函数
        // Effect的清除函数会在Effect被重新执行之前执行
        // 所以，我们可以在Effect的清除函数中，清除上一次的定时器（除此之外，也可以做一些其他工作来清除上次Effect执行带来的影响）
        return () => {
            clearTimeout(timer);
        }
    }, [keyword]);

    const handleInputChange = (e) => {
        setKeyword(e.target.value.trim());
    };

    return (
        <div className='filter'>
            <div className='filter-input-outer'>
                <input
                    type="text"
                    value={keyword}
                    placeholder='请输入搜索关键字'
                    className='filter-search-input'
                    onChange={handleInputChange}
                />
                <FontAwesomeIcon
                    className='filter-search-icon'
                    icon={faSearch}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
};

export default Filter;
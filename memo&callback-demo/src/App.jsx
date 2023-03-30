import React, {useState, useCallback} from 'react';
import A from "./components/A";

const App = () => {
    console.log('App渲染');
    const [count, setCount] = useState(1);
    // const clickHandler = () => {
    //     setCount(prevState => prevState + 1);
    // };

    // useCallback 是一个钩子函数，用来创建React中的回调函数
    // useCallback 创建的回调函数不会总在组件重新渲染时重新创建
    /*
    *   useCallback()
    *       参数：
    *           1. 回调函数
    *           2. 依赖数组
    *               - 当依赖数组中的变量发生变化时，回调函数才会重新创建
    *               - 如果不指定依赖数组，回调函数每次都会重新创建
    *               - 一定要将回调函数中使用到的所有变量都设置到依赖数组中
    *                   除了（setState）
    * */
    const clickHandler = useCallback(() => {
        setCount(prevState => prevState + 1);
    }, []);

    return (
        <div>
            <h2>App -- {count}</h2>
            <button onClick={clickHandler}>增加</button>
            {/* 我们给A组件也传递这个增加App中count值的函数，使得A组件也能够增加App中的count值 */}
            {/* 这样，即使A组件也被React.memo()包裹，虽然A组件中没有自己的state变化，
                但是传给A组件的props有变化，所以A组件也还是会重新渲染 */}
            {/* 那么我们如何解决这个问题呢？—— 使用useCallback这个钩子函数 */}

            {/* 上述clickHandler函数使用useCallback钩子函数包裹后，A组件就不会重新渲染了，因为A组件中没有自己的state变化 */}
            {/* 而且这个clickHandler函数的依赖数组中没有变量，clickHandler只会在APP组件初始化时创建一次，之后不会再重新创建 */}
            {/* 不会重新创建，那么就意味着A组件中的props也不会发生变化，所以A组件也就不会重新渲染了 */}
            <A onAddAppCount={clickHandler}/>
        </div>
    );
};

export default App;
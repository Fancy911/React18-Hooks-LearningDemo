import React, {useEffect, useState, useCallback} from 'react';
import StudentTable from "./components/StudentTable";
import StudataContext from './store/studata-context';
import useFetch from './hooks/useFetch';
import './App.css';

const App = () => {
    // 自定义fetch的使用
    // stusData是data的别名
    const { data: stusData, loading, error, fetchData } = useFetch({
        url: 'students',
    });

    // // 学生数据的state
    // const [stusData, setStusData] = useState([]);

    // // 添加一个state来记录数据是否正在加载：false表示没有加载数据，true表示加载
    // const [loading, setLoading] = useState(false);

    // // 创建一个state来记录错误信息
    // const [error, setError] = useState(null);
   
    /*
    *   将写死的数据替换为从接口 http://localhost:1337/api/students 中加载的数据
    *
    *   组件初始化时需要向服务器发送请求来加载数据
    * */
    // 在effect中加载数据, 该effect只会在组件初始化时执行一次, 因为第二个参数依赖项是空数组
    // useEffect(() => {
    //     setLoading(true); // 开始发请求时：设置loading为true
    //     setError(null); // 重置错误
        
    //     // fetch() 用来向服务器发送请求加载数据，是Ajax的升级版
    //     // 它需要两个参数：1.请求地址 2.请求信息
    //     fetch('http://localhost:1337/api/students')
    //         .then( res => {
    //             if (res.status == 200) {
    //                 // console.log(res,"res");
    //                 return res.json();// .json()该方法可以将响应的json直接转换为js对象
    //             }
    //             setLoading(false);
    //             throw new Error('请求失败');
    //         })
    //         .then(data => {
    //             // console.log(data,"data"); // 这里的data就是res.json()转换后的js对象
    //             setStusData(data.data);  // 将加载到的数据设置到state中
    //             // data中除了data数据之外，还有一个meta元数据字段，一般会传一些分页信息
    //             // 2.数据加载完毕后，设置loading为false
    //             setLoading(false);
    //         })
    //         .catch((e) => {
    //             setLoading(false);
    //             setError(e.message);
    //             console.log(error,"error");
    //         });
    // }, []);
    // ========================================
    // async await 请求写法
    // const fetchData = useCallback(async () => {
    //     try {
    //         setLoading(true);
    //         setError(null);
    //         const res = await fetch('http://localhost:1337/api/students');

    //         if (res.status === 200) {
    //             const data = await res.json();
    //             setStusData(data.data);
    //         }
    //         else {
    //             throw new Error('请求失败');
    //         }
    //     }
    //     catch (e) {
    //         setError(e.message);
    //     }
    //     // finally的用法：无论请求成功还是失败，都需要将loading设置为false
    //     finally {
    //         setLoading(false);
    //     }
    // }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const loadDataHandler = () => {
        fetchData();
    };

    return (
        <StudataContext.Provider value={{fetchData}}>
            <div className="app">
                <button onClick={loadDataHandler}>加载数据</button>
                {(!loading && !error) && <StudentTable stusData={stusData}/>}
                { loading && <p>数据正在加载中...</p> }
                { error && <p>数据加载异常！</p> }
            </div>
        </StudataContext.Provider>
    );
};

export default App;
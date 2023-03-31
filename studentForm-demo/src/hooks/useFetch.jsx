/*
*   React中的钩子函数只能在 函数组件 或 自定义钩子 中调用
*       当我们需要将React中钩子函数提取到一个公共区域时，就可以使用自定义钩子
*
*   自定义钩子其实就是一个普通函数，只是它的名字需要使用use开头
* */
import {useCallback, useState} from "react";

// reqObj: 用于存储请求的参数
// {
//     url: 'students',
//     method: 'get',
//     body: {}
// }
// callback: 一个函数，用于在请求成功后执行
export default function useFetch(reqObj, callback) {
    const [data, setData] = useState([]);
    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);
    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (body) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/' + reqObj.url, {
                method: reqObj.method || 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify({ data: body }) :  null
            });
            //判断请求是否加载成功
            if (res.status === 200) {
                const data = await res.json();
                setData(data.data);
                callback && callback();
            }
            else {
                throw new Error('数据加载失败！');
            }
        }
        catch (e) {
            setError(e);
        }
        finally {
            setLoading(false);
        }
    }, [callback, reqObj.method, reqObj.url]);

    // 设置返回值对象
    return {
        // 由于属性名和变量名一致，可以简写
        loading, // loading:loading
        error, // error:error 
        data,
        fetchData
    };
}
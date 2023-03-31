import React,{useState, useContext, useCallback} from 'react';
import useFetch from '../../../hooks/useFetch';
import StudataContext from '../../../store/studata-context';
import './index.css';

const StudentForm = (props) => {
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const studataCtx = useContext(StudataContext);

    const [inputData, setInputData] = useState({
        name: props.stuItem ? props.stuItem.attributes.name : '',
        gender: props.stuItem ? props.stuItem.attributes.gender : '女',
        age: props.stuItem ? props.stuItem.attributes.age : '',
        address: props.stuItem ? props.stuItem.attributes.address : ''
    });

    const handleNameChange = (e) => {
        setInputData(prevState => ({...prevState, name: e.target.value}));
    }

    const handleGenderChange = (e) => {
        setInputData(prevState => ({...prevState, gender: e.target.value}));
    }

    const handleAgeChange = (e) => {
        setInputData(prevState => ({...prevState, age: e.target.value}));
    }

    const handleAddressChange = (e) => {
        setInputData(prevState => ({...prevState, address: e.target.value}));
    }

    const submitHandler = () => {
        // console.log(inputData);
        // 调用添加接口
        upDateStuItem(inputData);
        console.log(JSON.stringify({data:inputData}));
    }

    // const updateHandler = () => {
    //     // console.log(inputData);
    //     // 调用更新接口
    //     // updateStu(props.stuItem.id, inputData);
    // }

    const { loading, error, fetchData: upDateStuItem } = useFetch({
        url: props.stuItem ? `students/${props.stuItem.id}` : 'students', // students/1
        method: props.stuItem ? 'put': 'post',
    }, studataCtx.fetchData)

    // const { loading, error, fetchData: updateStu } = useFetch({
    //     url: 'students',
    //     method: 'post',
    // }, studataCtx.fetchData)
    // const addNewStu = useCallback(async (data) => {
    //     try {
    //         setLoading(true);
    //         setError(null);

    //         const res = await fetch('http://localhost:1337/api/students',{
    //             method:'post',
    //             // 请求头，告诉服务器请求体的数据格式是json
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             // 请求体，需要将js对象转换为json字符串
    //             body: JSON.stringify({data:data}) 
    //         });
    //         if (res.status === 200) {
    //             // console.log('添加成功');
    //             studataCtx.fetchData();
    //         }
    //         else {
    //             throw new Error('添加失败');
    //         }
    //     }
    //     catch (e) {
    //         // console.log(e);
    //         setError(e);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // },[studataCtx])

    // const updateStu = useCallback(async (id, data) => {
    //     try {
    //         setLoading(true);
    //         setError(null);

    //         const res = await fetch(`http://localhost:1337/api/students/${id}`,{
    //             method:'put',
    //             // 请求头，告诉服务器请求体的数据格式是json
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             // 请求体，需要将js对象转换为json字符串
    //             body: JSON.stringify({data:data}) 
    //         });
    //         if (res.status === 200) {
    //             // console.log('更新成功');
    //             studataCtx.fetchData();
    //         }
    //         else {
    //             throw new Error('更新失败');
    //         }
    //     }
    //     catch (e) {
    //         setError(e.message);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // },[studataCtx])

    return (
        <>
            <tr className="student-form">
                <td>
                    <input
                        type='text'
                        value={inputData.name}
                        onChange={handleNameChange}
                    />
                </td>
                <td>
                    <select
                        onChange={handleGenderChange}
                        value={inputData.gender}
                    >
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td>
                    <input
                        type='text'
                        value={inputData.age}
                        onChange={handleAgeChange}
                    />
                </td>
                <td>
                    <input
                        type='text'
                        value={inputData.address}
                        onChange={handleAddressChange}
                    />
                </td>
                <td>
                    { props.stuItem && 
                        <>
                            <button onClick={submitHandler}>确认</button>
                            <button onClick={()=>props.onCancel()}>取消</button>
                        </>
                    }
                    { !props.stuItem && <button onClick={submitHandler}>添加</button> }
                </td>    
            </tr>
            { loading && <tr><td colSpan={5}>添加中...</td></tr> }
            { error && <tr><td colSpan={5}>添加失败</td></tr> }
        </>
    );
};

export default StudentForm;
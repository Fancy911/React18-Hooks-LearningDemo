import React,{useState, useCallback, useContext} from 'react';
import useFetch from '../../../hooks/useFetch';
import StudataContext from '../../../store/studata-context';
import StudentForm from '../StudentForm';

const StudentItem = (props) => {
    const { ...stuItem } = props.stuItem; // 这句话的意思是将props.stu中的所有属性都解构出来，然后赋值给stu
    const studataCtx = useContext(StudataContext);

    // const [loading, setLoading] = useState(false);  
    // const [error, setError] = useState(null); 
    const [isEdit, setIsEdit] = useState(false); 

    const deleteHandler = () => {
        delStu();
    };

    const { loading, error, fetchData: delStu } = useFetch({
        url: `students/${stuItem.id}`,
        method: 'delete',
    }, studataCtx.fetchData)


    // const delStu = useCallback(async () => {
    //     // 调用删除接口
    //     try {
    //         setLoading(true);
    //         setError(null);
    //         const res = await fetch(`http://localhost:1337/api/students/${stuItem.id}`,{
    //             method:'delete'
    //         });

    //         if (res.status === 200) {
    //             studataCtx.fetchData()
    //         }
    //         else {
    //             throw new Error('删除失败');
    //         }
    //     }
    //     catch (e) {
    //         setError(e);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // },[studataCtx, stuItem.id])

    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
            {!isEdit &&
                <tr>
                    <td>{stuItem.attributes.name}</td>
                    <td>{stuItem.attributes.gender}</td>
                    <td>{stuItem.attributes.age}</td>
                    <td>{stuItem.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>删除</button>
                        <button onClick={() => setIsEdit(true)}>修改</button>
                    </td>
                </tr>
            }
            { isEdit && <StudentForm stuItem={stuItem} onCancel={cancelEdit}/> }
            
            { loading && <tr><td colSpan={5}>正在删除数据...</td></tr> }
            { error && <tr><td colSpan={5}>删除失败...</td></tr> }
        </>
    );
};

export default StudentItem;
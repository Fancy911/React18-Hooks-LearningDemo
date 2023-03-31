import React from 'react';
import StudentItem from "./StudentItem";
import StudentForm from "./StudentForm";

import './index.css';

const StudentTable = (props) => {
    return (
        <table>
            <caption>学生列表</caption>
            <thead>
            <tr>
                <th>姓名</th>
                <th>性别</th>
                <th>年龄</th>
                <th>地址</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            { props.stusData.map( stuItem => <StudentItem key={stuItem.id} stuItem={stuItem}/> ) }
            </tbody>
            <tfoot>
                <StudentForm/>
            </tfoot>
        </table>
    );
};

export default StudentTable;
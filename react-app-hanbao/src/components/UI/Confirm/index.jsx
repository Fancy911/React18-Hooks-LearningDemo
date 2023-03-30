import React from 'react';
import BackDrop from '../BackDrop';
import './index.css';

const Confirm = (props) => {
    return (
        <BackDrop
            onClick={props.onCancel} // 点击背景遮罩，关闭弹出的确认框
            className='confirm-outer'>
            <div className='confirm'>
                <p className='confirm-text'>{props.confirmText}</p>

                <div>
                    <button
                        onClick={ (e) => {props.onCancel(e)} }
                        className='confirm-cancel'
                    >取消</button>
                    <button
                        onClick={ () => {props.onOk()} }
                        className='confirm-ok'
                    >确认</button>
                </div>
            </div>
        </BackDrop>
    );
};

export default Confirm;
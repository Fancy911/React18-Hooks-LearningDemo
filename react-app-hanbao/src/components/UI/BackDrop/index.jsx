import React from 'react';
import ReactDOM from "react-dom";

import './index.css';

const backdropRoot = document.getElementById('backdrop-root');

const Backdrop = (props) => {
    return ReactDOM.createPortal(
        <div
            {...props}
            className={`backdrop ${props.className}`}>
            {props.children}
        </div>, backdropRoot
    );
};

export default Backdrop;

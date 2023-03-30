import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 设置移动端的适配
// document.documentElement.style.fontSize = '20px'; // 设置根元素的字体大小为20px, 即1rem = 20px

// 除以750的意思是，规定视口的宽度是750rem，即750rem = 100vw，即1rem = 100vw / 750
document.documentElement.style.fontSize = 100 / 750 + 'vw'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <App/>
  // </React.StrictMode>
);
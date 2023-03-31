import React from "react";

const StudataContext = React.createContext({
    fetchData: () => {}, // 重新从服务器获取数据的函数
});

export default StudataContext;
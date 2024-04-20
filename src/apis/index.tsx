const apiHostUrl = process.env.API_HOST_URL ?
    process.env.API_HOST_URL : "http://localhost:8888";
export const queryRaffleAwardList = (strategyId: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/query_raffle_award_list`, {
            method: 'POST', // 修改为 POST 方法
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ strategy_id: strategyId }) // 发送 JSON 格式的请求体
        });
    } catch (error) {
        // 建议在这里处理错误日志或其它处理
        console.error('Error fetching data:', error);
        // 返回错误响应的模拟，这里直接返回一个 Promise 以符合函数的异步特性
        return Promise.resolve({
            json: () => Promise.resolve({
                "code": "0001",
                "info": "调用失败",
                "data": []
            })
        });
    }
}
export const randomRaffle = (strategyId: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/random_raffle`, {
            method: 'POST', // 修改为 POST 方法
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ strategy_id: strategyId }) // 发送 JSON 格式的请求体
        });
    } catch (error) {
        // 建议在这里处理错误日志或其它处理
        console.error('Error fetching data:', error);
    }
}

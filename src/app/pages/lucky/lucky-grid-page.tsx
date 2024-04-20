"use client"

import React, {useState, useRef, useEffect} from 'react'
// @ts-ignore
import {LuckyWheel} from '@lucky-canvas/react'
import {queryRaffleAwardList,randomRaffle} from "@/apis";
import {RaffleAwardVo} from "@/types/RaffleAwardVo";

export function LuckyWheelPage() {

    const strategyId = Number(100001)
    const [blocks] = useState([
        {padding: '10px', background: '#869cfa', imgs: [{src: "https://bugstack.cn/images/system/blog-03.png"}]}
    ])
    const [prizes,setPrizes] = useState([{}])
    const queryRaffleAwardListHandle = async()=>{
        const result = await queryRaffleAwardList(strategyId)
        const {code, message, data} =await result.json()
        if (code != "200"){
            window.alert("获取抽奖奖品列表失败 code:"+code+"message:"+message)
            return;
        }
        console.log(data)
        const prizes = data.raffle_award_list.map((award:RaffleAwardVo,index:number)=>{
            const background= index%2===0?'#e9e8fe':'#b8c5f2';
            return{
                background:background,
                fonts:[{id:award.award_id,text:award.award_title,top:'15px'}]
            }
        })

        setPrizes(prizes)
    }
    const [buttons] = useState([
        {radius: '40%', background: '#617df2'},
        {radius: '35%', background: '#afc8ff'},
        {
            radius: '30%', background: '#869cfa',
            pointer: true,
            fonts: [{text: '开始', top: '-10px'}]
        }
    ])
    const myLucky = useRef()
    useEffect(()=>{
        queryRaffleAwardListHandle().then(r=>{

        });
    },[])
    return <div>
        <LuckyWheel
            ref={myLucky}
            width="300px"
            height="300px"
            blocks={blocks}
            prizes={prizes}
            buttons={buttons}
            onStart={async () => { // 将 onStart 修改为 async 函数
                // 开始抽奖
                // @ts-ignore
                myLucky.current.play()
                try {
                    const response = await randomRaffle(strategyId);
                    console.log(response)// 调用 randomRaffle 函数
                    // @ts-ignore
                    const data = await response.json(); // 解析返回的 JSON 数据
                    if (data.code === 200) { // 确保服务器响应为成功
                        const prizeIndex = data.data.award_index - 1; // 从响应中获取奖品索引并调整为0开始
                        setTimeout(() => {
                            // @ts-ignore
                            myLucky.current.stop(prizeIndex); // 使用调整后的奖品索引停止转盘
                        }, 2500);
                    } else {
                        throw new Error(data.message || '未知错误'); // 如果响应码不是200，抛出异常
                    }
                } catch (error) {
                    console.error('抽奖出错:', error);
                    // @ts-ignore
                    alert('抽奖出错: ' + error.message); // 向用户显示错误信息
                }
            }}
            onEnd={
                (prize: { fonts: { text: string; }[]; }) => {
                    alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品')
                }
            }
        />
    </div>
}

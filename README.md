# NgChatApp
此為 Angular Signals + @ngrx/signals + websocket 的小專案，主要練習使用 @ngrx/signals 做狀態管理。

> 若想練習 web socket 或其他框架的實現，可搭配 [chat-app-backend](https://github.com/JiaHongL/chat-app-backend) 這個後端專案。

## 此專案已實現功能

- 大廳功能 (多對多)
- 私訊功能 (一對一)
- 好友即時上線狀態
- 回覆指定訊息
- 收回訊息 & 恢復訊息
- 已讀功能
- 新訊息通知
- 傳送圖片 (支援截圖貼上)

> 前端的**資料狀態**都是藉由 websocket 與後端做**即時溝通**。

## websocket & chat store

![截圖 2024-05-31 凌晨3.58.23](https://hackmd.io/_uploads/ByVZsUI4R.png)

> webscoket 接收畫面

![截圖 2024-05-31 凌晨3.57.30](https://hackmd.io/_uploads/HyL-jU8EC.png)

> 前端 ChatStore 結構組成

## 相關畫面

### 大廳
![image](https://hackmd.io/_uploads/Byu2vULER.png)

### 私訊
![image](https://hackmd.io/_uploads/BJABBU840.png)

### 手機好友列表
<img src="https://hackmd.io/_uploads/ryQEQILVA.png" alt="截圖 2024-05-31 凌晨3.16.40" width="300" height="600" />

### 手機訊息通知列
<img src="https://hackmd.io/_uploads/S1SV7UI4R.png" alt="截圖 2024-05-31 凌晨3.16.40" width="300" height="600" />

### 手機對話畫面
<img src="https://hackmd.io/_uploads/rkdEmL840.png" alt="截圖 2024-05-31 凌晨3.16.40" width="300" height="600" />

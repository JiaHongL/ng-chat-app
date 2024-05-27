// models.ts
export interface GeneralMessage {
    room: string;
    message: string;
    sender: string;
    date: string;
    isRead?: boolean; // private 訊息的已讀狀態 (前端自己使用)
    readCount?: number; // general 訊息的已讀數量 (前端自己使用)
}

export interface PrivateMessage extends GeneralMessage {
    to: string;
}

export interface User {
    username: string;
    status: 'offline' | 'online';
}

export interface UserInfo {
    username: string;
    status: 'offline' | 'online';
    avatar: string;
}

export interface ChatState {
    isSocketStable: boolean;
    userInfo: UserInfo | null;
    currentRoom: string;
    users: User[];
    generalMessages: GeneralMessage[];
    privateMessages: PrivateMessage[];
    unreadCounts: { [room: string]: number };
    generalUnReadInfo: {
        [username: string]: number;
    }
}

export const initialState: ChatState = {
    isSocketStable: false,
    userInfo: null,
    currentRoom: '',
    users: [],
    generalMessages: [],
    privateMessages: [],
    unreadCounts: {}, // 用於存儲各個聊天室的未讀訊息計數
    generalUnReadInfo: {}
};

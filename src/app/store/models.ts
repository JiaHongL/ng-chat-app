// models.ts
export interface GeneralMessage {
    room: string;
    message: string;
    sender: string;
    date: string;
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
}

export const initialState: ChatState = {
    isSocketStable: false,
    userInfo: null,
    currentRoom: 'general', // 默認聊天室
    users: [],
    generalMessages: [],
    privateMessages: [],
    unreadCounts: {}, // 用於存儲各個聊天室的未讀訊息計數
};

// models.ts
export interface GeneralMessage {
    id: string;
    room: string;
    message: string;
    sender: string;
    date: string;
    isRecalled:boolean;
    readBy: string[];
    replyToMessageId:string;
    replyToMessage:GeneralMessage | null;
}

export interface PrivateMessage {
    id: string;
    room: string;
    message: string;
    sender: string;
    to: string;
    date: string;
    isRead: boolean;
    isRecalled:boolean;
    replyToMessageId:string;
    replyToMessage:PrivateMessage | null;
}

export type RoomMessage = GeneralMessage & PrivateMessage;

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
    currentRoom: '',
    users: [],
    generalMessages: [],
    privateMessages: [],
    unreadCounts: {}, // 用於存儲各個聊天室的未讀訊息計數
};

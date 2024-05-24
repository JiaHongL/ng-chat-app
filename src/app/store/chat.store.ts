// chat.store.ts
import { inject, computed, effect } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { User, ChatState, initialState, UserInfo, PrivateMessage } from './models';

import { UserService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState<ChatState>(initialState),
  withComputed((store) => ({
    onlineUsers: computed(() => store.users().filter(user => user.status === 'online')),
    offlineUsers: computed(() => store.users().filter(user => user.status === 'offline')),
    messageNotifications: computed(() => {

      const generalUnreadCount = store.unreadCounts()['general'] || 0;
      const generalLastMessage = store.generalMessages().slice(-1)[0];

      let privateUnreadCounts = store.users().map(user => {
        const username = user.username;
        const status = user.status;
        const room = `private_${username}_${store.userInfo()?.username}`; // 收訊者為登入者的聊天室名稱
        let unreadCount = store.unreadCounts()[room] || 0;
        let lastMessage: PrivateMessage = store.privateMessages().filter(msg => msg.room === room).slice(-1)[0];
        return {
          username,
          room,
          status,
          unreadCount,
          lastMessage,
        };
      });

      privateUnreadCounts = privateUnreadCounts.sort((a, b) => {
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        return new Date(b.lastMessage.date).getTime() - new Date(a.lastMessage.date).getTime();
      });

      return {
        general: {
          room: 'general',
          unreadCount: generalUnreadCount,
          lastMessage: generalLastMessage || { message: '', date: '' }
        },
        private: privateUnreadCounts,
      };

    }),
    currentChatPartner: computed(() => {
      const currentRoom = store.currentRoom();
      if (currentRoom.startsWith('private_')) {
        // private_{{sender}}_{{to}}
        // 登入者為 user01，與 user02 的聊天室名稱為 private_user01_user02 
        // 左側訊息通知: private_user02_user01，右側聊天室名稱: private_user01_user02，所以會需要判斷 sender 與 to
        const sender = currentRoom.split('_')[1];
        const to = currentRoom.split('_')[2];
        const partnerUsername = sender === store.userInfo()?.username ? to : sender;
        const user = store.users().find(user => user.username === partnerUsername);
        return user;
      }else if(currentRoom === 'general'){
        return { username: 'general', status: 'online' };
      }
      return null;
    }),
    currentChatMessages: computed(() => {
      const currentRoom = store.currentRoom();
      if (currentRoom === 'general') {
        return store.generalMessages() || [];
      } else {
        return store.privateMessages().filter(msg => ( msg.room === currentRoom)) || [];
      }
    })
  })),
  withMethods((store) => {
    const userService = inject(UserService);
    const token = userService.getToken();
    let socket: WebSocket | null = null;

    const connectWebSocket = async () => {

      try {
        // 取得使用者資訊
        const userInfo = await firstValueFrom(userService.getUserInfo()) as UserInfo;
        patchState(store, { userInfo });

        // 取得所有使用者列表
        const getUserPromise = firstValueFrom(userService.getUsers());
        const users = await getUserPromise as User[];
        patchState(store, { users });
      } catch (error) {
        alert('Error fetching');
      }

      const wsUrl = 'ws://localhost:3000';
      socket = new WebSocket(`${wsUrl}?token=${token}`);

      socket.onopen = () => console.log('Connected to server');
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('=>>>Received message:', message);
        switch (message.event) {
          case 'onlineUsers':
            patchState(store, {
              users: store.users().map(user => {
                const isOnline = message.data.users.find((id: string) => id === user.username);
                return {
                  ...user,
                  status: isOnline ? 'online' : 'offline',
                }
              }) as User[]
            });
            break;
          case 'messageHistory':
            if (message.data.room === 'general') {
              patchState(store, { generalMessages: message.data.messages });
            } else {
              patchState(store, { privateMessages: [...store.privateMessages(), ...message.data.messages] });
            }
            break;
          case 'message':
            patchState(store, { generalMessages: [...store.generalMessages(), message.data] });
            break;
          case 'privateMessage':
            patchState(store, { privateMessages: [...store.privateMessages(), message.data] });
            break;
          case 'unreadMessages':
            patchState(store, (state) => ({
              unreadCounts: {
                ...state.unreadCounts,
                [message.data.room]: message.data.count,
              },
            }));
            break;
          case 'updateUserList':
            patchState(store, { users: message.data });
            break;
        }
      };

      socket.onclose = (event) => {
        console.log('Disconnected from server', event);
      };

      socket.onerror = (error) => {
        console.log('WebSocket error', error);
      };

      return socket;
    };

    const disconnectWebSocket = () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    };

    const sendGeneralMessage = (message: string) => {
      if (!socket) {return}
        socket.send(JSON.stringify({
          "event": "message",
          "data": {
              "room": "general",
              "message": message,
              "sender": store.userInfo()?.username,
          }
      }));
    }

    const sendPrivateMessage = (message: string) => {
      if (!socket) {return}
        socket.send(JSON.stringify({
          "event": "privateMessage",
          "data": {
              "to": store.currentChatPartner()?.username,
              "message": message,
              "sender": store.userInfo()?.username,
          }
      }));
    }

    const markAsRead = (room: string, type: 'general' | 'private') => {
      if (!socket) {return}
      socket.send(JSON.stringify({
          "event": "markAsRead",
          "data": {
              "room": room,
              "type": type,
          }
      }));
      console.log('Marked as read~');
    }

    const markGeneralAsRead = () => {
      markAsRead('general', 'general');
    }

    const markPrivateAsRead = (room:string) => {
      markAsRead(room, 'private');
    }

    return {
      connectWebSocket,
      disconnectWebSocket,
      setCurrentRoom(room: string) {
        patchState(store, { currentRoom: room });
      },
      sendGeneralMessage,
      markGeneralAsRead,
      sendPrivateMessage,
      markPrivateAsRead
    };
  })
);
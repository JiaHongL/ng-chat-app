import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';

import { UserStatusListComponent } from './user-status-list/user-status-list.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatStore } from '../../store/chat.store';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { ViewService } from '../../services/view.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    UserStatusListComponent,
    ConversationListComponent,
    ChatWindowComponent,
    JsonPipe,
    BottomNavigationComponent
  ],
  template: `
  <!-- desktop -->
  <div class="hidden sm:block">
    <div 
      class="font-sans bg-gray-200 h-screen min-w-[700px]  flex items-center justify-center"
      [ngClass]="{'animate-pulse': !store.isSocketStable()}"
    >
      <div class="flex w-4/5 h-4/5 min-w-[700px] bg-white rounded-lg shadow-lg">
          <!-- Sidebar -->
          <app-conversation-list />
          <!-- Chat area -->
          <app-chat-window />
          <!-- Online/Offline users list -->
          <app-user-status-list />
      </div>
    </div>
  </div>
  <!-- mobile -->
  <div class="block sm:hidden">
    <div 
      class="font-sans bg-gray-200 h-100 w-screen"
    >
      <div class="flex flex-col w-screen bg-white rounded-lg shadow-lg">
          <div class="w-screen margin-2">
            <!-- 好友頁 -->
            <div [hidden]="viewService.currentView()!=='friendList'">
                <app-user-status-list />
                <app-bottom-navigation />
            </div>
            <!-- 通知訊息頁 -->
            <div [hidden]="viewService.currentView()!=='chatList'">
                <app-conversation-list />
                <app-bottom-navigation />
            </div>
            <!-- 對話頁面 -->
            <div [hidden]="viewService.currentView()!=='chatWindow'">
              <app-chat-window />
            </div>
          </div>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  store = inject(ChatStore);
  viewService = inject(ViewService);
  title = inject(Title);

  intervalId = 0;
  unreadMessagesEffect = effect(() => {
    const isMobile = this.viewService.isMobile();
    if(isMobile){
      this.clearInterval();
      return;
    }
    const count = this.store.allUnreadCount();
    if (count > 0 && !this.intervalId) {
      this.title.setTitle(`🔔 New messages ( ${count} )`);
      this.intervalId = window.setInterval(() => {
        if (this.title.getTitle().includes('New messages')) {
          this.title.setTitle('NgChatApp');
        } else {
          this.title.setTitle(`🔔 New messages ( ${count} )`);
        }
      }, 700);
    } else {
      this.clearInterval();
    }
  })

  constructor() {
    this.store.connectWebSocket();
  }

  clearInterval() {
    if (this.intervalId){
      window.clearInterval(this.intervalId);
      this.intervalId = 0;
      this.title.setTitle('NgChatApp');
    }
  }

  ngOnDestroy() {
    this.store.disconnectWebSocket();
    this.clearInterval();
  }

}

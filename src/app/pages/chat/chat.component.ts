import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ViewService } from '../../services/view.service';

import { ChatStore } from '../../store/chat.store';

import { UserStatusListComponent } from './user-status-list/user-status-list.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';

import { Subject, interval, map, startWith, takeUntil, tap } from 'rxjs';

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
export class ChatComponent implements OnDestroy {
  store = inject(ChatStore);
  viewService = inject(ViewService);
  title = inject(Title);

  private readonly destroy$ = new Subject<void>();

  unreadMessagesEffect = effect(() => {
    const count = this.store.allUnreadCount();

    if (this.viewService.isRaelMobile) { return; }

    if (count > 0) {
      interval(700).pipe(
        startWith(0),
        map(() => this.title.getTitle()),
        tap(currentTitle => {
          if (currentTitle.includes('New messages')) {
            this.title.setTitle('NgChatApp');
          } else {
            this.title.setTitle(`🔔 New messages ( ${count} )`);
          }
        }),
        takeUntil(this.destroy$)
      ).subscribe();
    } else {
      this.clearTitle();
    }
    
  });

  constructor() {
    this.store.connectWebSocket();
  }

  clearTitle() {
    this.destroy$.next();
    this.title.setTitle('NgChatApp');
  }

  ngOnDestroy() {
    this.store.disconnectWebSocket();
    this.clearTitle();
    this.destroy$.complete();
  }

}
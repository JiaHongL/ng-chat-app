import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';

import { UserStatusListComponent } from './user-status-list/user-status-list.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatStore } from '../../store/chat.store';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { ViewStateService } from '../../services/view-state.service';

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
      class="font-sans bg-gray-200 h-screen w-screen"
    >
      <div class="flex flex-col h-screen w-screen bg-white rounded-lg shadow-lg">
          <div class="h-screen w-screen margin-2">
            <div [hidden]="viewState.currentView()!=='chatList'">
                <app-conversation-list />
                <app-bottom-navigation />
            </div>
            <div [hidden]="viewState.currentView()!=='friendList'">
                <app-user-status-list />
                <app-bottom-navigation />
            </div>
            <div [hidden]="viewState.currentView()!=='chatWindow'">
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
  viewState = inject(ViewStateService);

  constructor() {
    this.store.connectWebSocket();}

  ngOnDestroy() {
    this.store.disconnectWebSocket();
  }

}

import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';

import { UserStatusListComponent } from './user-status-list/user-status-list.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatStore } from '../../store/chat.store';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    UserStatusListComponent,
    ConversationListComponent,
    ChatWindowComponent,
    JsonPipe
  ],
  template: `
  <div 
    class="bg-gray-200 h-screen min-w-[700px] flex items-center justify-center"
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  store = inject(ChatStore);

  constructor() {
    this.store.connectWebSocket();}

  ngOnDestroy() {
    this.store.disconnectWebSocket();
  }

}

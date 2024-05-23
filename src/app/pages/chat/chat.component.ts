import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserStatusListComponent } from './user-status-list/user-status-list.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    UserStatusListComponent,
    ConversationListComponent,
    ChatWindowComponent
  ],
  template: `
  <div class="bg-gray-200 h-screen flex items-center justify-center">
    <div class="flex w-4/5 h-4/5 bg-white rounded-lg shadow-lg">
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
export class ChatComponent { }

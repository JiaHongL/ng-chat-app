import { ChatStore } from '../../../store/chat.store';
import { UserService } from './../../../services/user.service';
import { ViewStateService } from './../../../services/view-state.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="bottom-navigation fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden">
    <button 
      class="flex flex-col items-center text-gray-600"
      [ngClass]="{ 
        'font-bold': viewStateService.currentView() === 'friendList'
      }" 
      (click)="viewStateService.goToFriendList()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
      <span class="text-xs">Friends</span>
    </button>
    <button 
      class="relative flex flex-col items-center text-gray-600"
      [ngClass]="{ 
        'font-bold': viewStateService.currentView() === 'chatList'
      }"  
      (click)="viewStateService.goToChatList()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
      <span class="text-xs">Chat</span>
      <div class="absolute top-0 right-[-5px] bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center" *ngIf="chatStore.allUnreadCount() > 0">
          {{ chatStore.allUnreadCount() }}
        </div>
    </button>
    <button class="flex flex-col items-center text-gray-600" (click)="viewStateService.resetScroll();userService.logout()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3h5a3 3 0 013 3v1" />
      </svg>
      <span class="text-xs">logout</span>
    </button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavigationComponent {
  viewStateService = inject(ViewStateService);
  userService = inject(UserService);
  chatStore = inject(ChatStore);
  cdr = inject(ChangeDetectorRef);

  constructor() {
    this.viewStateService.getCurrentView$().pipe(debounceTime(0)).subscribe((view) => {
      this.cdr.detectChanges();
    })
  }

}

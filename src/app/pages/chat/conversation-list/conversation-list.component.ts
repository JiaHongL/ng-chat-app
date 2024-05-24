import { UserService } from './../../../services/user.service';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { ChatStore } from '../../../store/chat.store';

@Component({
	selector: 'app-conversation-list',
	standalone: true,
	imports: [
		CommonModule,
		DatePipe
	],
	template: `
  <div class="flex items-center mb-4">
      <img class="w-10 h-10 rounded-full mr-2 bg-white" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=joe" alt="Profile Image">
      <span class="font-semibold text-xl text-gray-900">{{ store.userInfo()?.username }}</span>
      <button 
	  	class="ml-auto bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
		(click)="userService.logout()"
	  >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"></path>
          </svg>
      </button>
  </div>
	<h3 class="font-semibold text-sm text-gray-300 mb-1">General</h3>
	<div class="cursor-pointer mb-2" (click)="store.setCurrentRoom('general')">
			<div 
				class="flex items-center p-2 rounded-lg bg-white shadow relative"
				[ngClass]="{ 
							'bg-blue-100': store.currentChatPartner()?.username === 'general',
							'bg-white': store.currentChatPartner()?.username !== 'general',
						}"
			>
					<div class="relative flex-shrink-0 flex-grow-0">
						<img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/initials/svg?seed=General" alt="Profile Image">
					</div>
					<div class="flex-grow overflow-hidden">
							<div>
									<div class="font-semibold">general</div>
									<div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{{ store.messageNotifications().general.lastMessage.message }}</div>
							</div>
							<span class="absolute top-2 right-2 text-blue-500 text-sm">{{ store.messageNotifications().general.lastMessage.date | date: 'HH:mm'  }}</span>
							@if(store.messageNotifications().general.unreadCount){
								<span class="absolute top-6 right-1 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">{{ store.messageNotifications().general.unreadCount }}</span>
							}
						</div>
			</div>
	</div>

  <h3 class="font-semibold text-sm text-gray-300 mb-1">Private Message</h3>
  <ul class="max-h-70 overflow-scroll">
    <!-- Repeat similar list items for other contacts -->
		@for (user of store.messageNotifications().private; track user.username) {
			@if(user?.lastMessage){
				<li class="cursor-pointer mb-2" (click)="store.setCurrentRoom(user.room)">
						<div 
							class="flex items-center p-2 rounded-lg bg-blue-100 shadow relative"
							[ngClass]="{ 
								'bg-blue-100': store.currentChatPartner()?.username === user.username,
								'bg-white': store.currentChatPartner()?.username !== user.username
							}"
						>
								<div class="relative flex-shrink-0 flex-grow-0">
									<img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed={{user.username }}" alt="Profile Image">
									@if(user.status === 'online'){
										<span class="absolute bottom-0 right-3 bg-green-600 w-2 h-2 rounded-full"></span>
									} @else{
										<span class="absolute bottom-0 right-3 bg-gray-500 w-2 h-2 rounded-full"></span>
									}									
								</div>
								<div class="flex-grow overflow-hidden">
										<div>
												<div class="font-semibold">{{ user.username }}</div>
												<div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis"> {{ user?.lastMessage?.message }}</div>
										</div>
										<span class="absolute top-2 right-2 text-blue-500 text-sm">{{ user?.lastMessage?.date | date: 'HH:mm' }}</span>
										@if(user?.unreadCount){
											<span class="absolute top-6 right-1 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">{{ user?.unreadCount }}</span>
										}
								</div>
						</div>
				</li>
			}
		}
  </ul>
  `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationListComponent {
	@HostBinding('class') className = 'w-1/4 bg-gray-100 p-4 w-100 h-100';
	store = inject(ChatStore);
	userService = inject(UserService);
}

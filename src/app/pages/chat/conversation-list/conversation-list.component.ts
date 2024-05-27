import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';

import { ChatStore } from '../../../store/chat.store';

import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

import { ViewService } from '../../../services/view.service';
import { UserService } from './../../../services/user.service';

@Component({
	selector: 'app-conversation-list',
	standalone: true,
	imports: [
		CommonModule,
		DatePipe,
		SafeHtmlPipe
	],
	template: `
	<h2 class="sm:hidden text-center text-3xl">
		Chats
	</h2>
	<div class="hidden sm:flex items-center mb-4">
		@if(store.userInfo()?.username ){
			<img class="w-10 h-10 rounded-full mr-2 bg-white" src="https://api.dicebear.com/8.x/pixel-art/svg?seed={{ store.userInfo()?.username }}" alt="Profile Image">
			<span class="font-semibold text-xl text-gray-900 max-w-[110px] text-nowrap overflow-hidden text-ellipsis">{{ store.userInfo()?.username }}</span>
		}
		<button 
			class="ml-auto bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
			(click)="userService.logout()"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"></path>
			</svg>
		</button>
	</div>

	<h3 class="font-semibold text-sm text-gray-500 mb-1">General</h3>
	<div class="cursor-pointer mb-2" (click)="store.setCurrentRoom('general');viewService.goToChatView()">
			<div 
				class="flex items-center p-2 rounded-lg bg-white shadow relative"
				[ngClass]="{ 
							'bg-blue-100': store.currentChatPartner()?.username === 'general' && !viewService.isMobile(),
							'bg-white': store.currentChatPartner()?.username !== 'general' || viewService.isMobile(),
						}"
			>
					<div class="relative flex-shrink-0 flex-grow-0">
						<img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/initials/svg?seed=General" alt="Profile Image">
					</div>
					<div class="flex-grow overflow-hidden">
							<div>
									<div class="font-semibold">
										general
										<span class="text-sm text-gray-500">
											({{ store.users().length }})
										</span>
									</div>
									<div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
										@if(
											store.messageNotifications().general.lastMessage.message.includes('data:image')
										){
											{{
												store.messageNotifications().general.lastMessage.sender === store.userInfo()?.username ? 'You' : store.messageNotifications().general.lastMessage.sender
											}} sent a photo.
										}@else {
											{{ store.messageNotifications().general.lastMessage.message | appSafeHtml }}
										}
									</div>
							</div>
							<span class="absolute top-2 right-2 text-blue-500 text-sm">{{ store.messageNotifications().general.lastMessage.date | date: 'HH:mm'  }}</span>
							@if(store.messageNotifications().general.unreadCount){
								<span class="absolute top-6 right-2 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">{{ store.messageNotifications().general.unreadCount }}</span>
							}
						</div>
			</div>
	</div>

	<h3 class="font-semibold text-sm text-gray-500 mb-1">Private Message</h3>
	<ul class="pb-[250px] sm:pb-0 sm:max-h-73 sm:overflow-scroll custom-scrollbar">
		<!-- Repeat similar list items for other contacts -->
			@for (user of store.messageNotifications().private; track user.username) {
				@if(user?.lastMessage){
					<li class="cursor-pointer mb-2" (click)="store.setCurrentRoom(user.room);viewService.goToChatView()">
							<div 
								class="flex items-center p-2 rounded-lg bg-blue-100 shadow relative"
								[ngClass]="{ 
									'bg-blue-100': store.currentChatPartner()?.username === user.username && !viewService.isMobile(),
									'bg-white': store.currentChatPartner()?.username !== user.username || viewService.isMobile(),
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
													<div class="font-semibold max-w-[85%] sm:max-w-[110px] text-nowrap overflow-hidden text-ellipsis">{{ user.username | appSafeHtml }}</div>
													<div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
														@if(
															store.messageNotifications().general.lastMessage.message.includes('data:image')
														){
															{{store.messageNotifications().general.lastMessage.sender === store.userInfo()?.username ? 'You' : store.messageNotifications().general.lastMessage.sender}} sent a photo.
														}@else {
															{{ store.messageNotifications().general.lastMessage.message | appSafeHtml }}
														}
													</div>
											</div>
											<span class="absolute top-2 right-2 text-blue-500 text-sm">{{ user?.lastMessage?.date | date: 'HH:mm' }}</span>
											@if(user?.unreadCount){
												<span class="absolute top-6 right-2 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">{{ user?.unreadCount }}</span>
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
	@HostBinding('class') className = 'z-10 overflow-scroll custom-scrollbar inline-block w-screen h-screen sm:h-auto p-4 sm:max-w-[250px] sm:min-w-[250px] bg-gray-100 sm:p-4 sm:w-100 sm:h-100';
	store = inject(ChatStore);
	userService = inject(UserService);
	viewService = inject(ViewService);
}

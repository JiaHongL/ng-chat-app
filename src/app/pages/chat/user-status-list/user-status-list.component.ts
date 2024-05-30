import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';

import { environment } from './../../../../environments/environment';

import { ChatStore } from '../../../store/chat.store';
import { ViewService } from '../../../services/view.service';

@Component({
  selector: 'app-user-status-list',
  standalone: true,
  imports: [
	CommonModule
],
  template: `
	<div class="overflow-scroll custom-scrollbar">
		<h2 class="sm:hidden text-center text-3xl">
			Friends
		</h2>
		<div class="flex-grow-0">
				<h3 class="font-semibold text-sm text-green-500">Online - {{ store.onlineUsers().length }}</h3>
		</div>
		<div class="flex-0 mb-3">
				<ul class="overflow-hidden">
					@for (user of store.onlineUsers(); track user.username) {
						<li
								class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-white"
								(click)="store.setCurrentRoom('private_' + store.userInfo()?.username + '_' + user.username);viewService.goToChatView();"
						>
								<img
								class="w-10 h-10 rounded-full mr-2"
								src="{{environment.profileImageApi}}{{user.username}}"
								alt="Profile Image"
								/>
								<div>
								<div class="font-semibold text-gray-700 max-w-[280px] sm:max-w-[85px] text-nowrap overflow-hidden text-ellipsis">
									{{user.username}}
									@if (user.username === store.userInfo()?.username) {
										<span class="text-xs text-blue-400">(You)</span>
									}
								</div>
								</div>
						</li>
					}
				</ul>
		</div>
		<div class="flex-grow-0">
				<h3 class="font-semibold text-sm text-gray-500">Offline - {{ store.offlineUsers().length }}</h3>
		</div>
		<div class="flex-0">
				<ul class="overflow-hidden pb-[250px] sm:pb-0">
					@for (user of store.offlineUsers(); track user.username) {
						<li
								class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50"
								(click)="store.setCurrentRoom('private_' + store.userInfo()?.username + '_' + user.username);viewService.goToChatView()"
						>
								<img
								class="w-10 h-10 rounded-full mr-2"
								src="{{environment.profileImageApi}}{{user.username}}"
								alt="Profile Image"
								/>
								<div>
								<div class="font-semibold text-gray-700 max-w-[280px] sm:max-w-[85px] text-nowrap overflow-hidden text-ellipsis">{{user.username}}</div>
								</div>
						</li>
					}
				</ul>
		</div>
	</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStatusListComponent {
	environment = environment;
  @HostBinding('class') class = 'h-screen sm:pb-0 sm:h-auto min-w-[200px] w-100 bg-gray-100 p-4 flex flex-nowrap flex-col';
  store = inject(ChatStore);
  viewService = inject(ViewService);
}

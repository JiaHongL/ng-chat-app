import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { ChatStore } from '../../../store/chat.store';

@Component({
  selector: 'app-user-status-list',
  standalone: true,
  imports: [
	CommonModule
],
  template: `
	<div class="overflow-scroll custom-scrollbar">
		<div class="flex-grow-0">
				<h3 class="font-semibold text-sm text-green-500">Online - {{ store.onlineUsers().length }}</h3>
		</div>
		<div class="flex-0 mb-3">
				<ul class="overflow-hidden">
					@for (user of store.onlineUsers(); track user.username) {
						<li
								class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-white"
								(click)="store.setCurrentRoom('private_' + store.userInfo()?.username + '_' + user.username)"
						>
								<img
								class="w-10 h-10 rounded-full mr-2"
								src="https://api.dicebear.com/8.x/pixel-art/svg?seed={{user.username}}"
								alt="Profile Image"
								/>
								<div>
								<div class="font-semibold text-gray-700 max-w-[70px] text-nowrap overflow-hidden text-ellipsis">{{user.username}}</div>
								</div>
						</li>
					}
				</ul>
		</div>
		<div class="flex-grow-0">
				<h3 class="font-semibold text-sm text-gray-500">Offline - {{ store.offlineUsers().length }}</h3>
		</div>
		<div class="flex-0">
				<ul class="overflow-hidden">
					@for (user of store.offlineUsers(); track user.username) {
						<li
								class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50"
								(click)="store.setCurrentRoom('private_' + store.userInfo()?.username + '_' + user.username)"
						>
								<img
								class="w-10 h-10 rounded-full mr-2"
								src="https://api.dicebear.com/8.x/pixel-art/svg?seed={{user.username}}"
								alt="Profile Image"
								/>
								<div>
								<div class="font-semibold text-gray-700 max-w-[70px] text-nowrap overflow-hidden text-ellipsis">{{user.username}}</div>
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
  @HostBinding('class') class = 'mix-w-[200px] min-w-[200px] w-100 bg-gray-100 p-4 flex flex-nowrap flex-col';
  store = inject(ChatStore);
}

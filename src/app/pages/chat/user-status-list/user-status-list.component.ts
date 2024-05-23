import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-user-status-list',
  standalone: true,
  imports: [CommonModule],
  template: `
	<div class="flex-grow-0">
			<h3 class="font-semibold text-sm text-green-500">Online</h3>
	</div>
	<div class="flex-0 mb-3 overflow-scroll">
			<ul>
			<li
					class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-white"
			>
					<img
					class="w-10 h-10 rounded-full mr-2"
					src="https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
					alt="Profile Image"
					/>
					<div>
					<div class="font-semibold text-gray-700">Joe</div>
					</div>
			</li>
			<li
					class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-white"
			>
					<img
					class="w-10 h-10 rounded-full mr-2"
					src="https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
					alt="Profile Image"
					/>
					<div>
					<div class="font-semibold text-gray-700">David</div>
					</div>
			</li>
			</ul>
	</div>
	<div class="flex-grow-0">
			<h3 class="font-semibold text-sm text-gray-500">Offline</h3>
	</div>
	<div class="flex-0 overflow-scroll">
			<ul>
			<li
					class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50"
			>
					<img
					class="w-10 h-10 rounded-full mr-2"
					src="https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
					alt="Profile Image"
					/>
					<div>
					<div class="font-semibold text-gray-700">John</div>
					</div>
			</li>
			<li
					class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50"
			>
					<img
					class="w-10 h-10 rounded-full mr-2"
					src="https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
					alt="Profile Image"
					/>
					<div>
					<div class="font-semibold text-gray-700">Linda</div>
					</div>
			</li>
			<li
					class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50"
			>
					<img
					class="w-10 h-10 rounded-full mr-2"
					src="https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
					alt="Profile Image"
					/>
					<div>
					<div class="font-semibold text-gray-700">Jane</div>
					</div>
			</li>
			</ul>
	</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStatusListComponent {
  @HostBinding('class') class =
    'w-1/5 w-100 bg-gray-100 p-4 flex flex-nowrap flex-col';
}

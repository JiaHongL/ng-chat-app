import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="flex items-center mb-4">
      <img class="w-10 h-10 rounded-full mr-2 bg-white" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=joe" alt="Profile Image">
      <span class="font-semibold text-xl text-gray-900">Joe</span>
      <button class="ml-auto bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"></path>
          </svg>
      </button>
  </div>
  <h3 class="font-semibold text-sm text-gray-300 mb-1">General</h3>
  <div class="cursor-pointer mb-2">
      <div class="flex items-center p-2 rounded-lg bg-white shadow relative">
          <div class="relative flex-shrink-0 flex-grow-0">
            <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/initials/svg?seed=General" alt="Profile Image">
          </div>
          <div class="flex-grow overflow-hidden">
              <div class="">
                  <div class="font-semibold">General</div>
                  <div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">Hey, how are you doing?</div>
              </div>
              <span class="absolute top-2 right-2 text-blue-500 text-sm">11:45</span>
              <span class="absolute top-6 right-1 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">99</span>
          </div>
      </div>
  </div>
  <h3 class="font-semibold text-sm text-gray-300 mb-1">Private Message</h3>
  <ul class="max-h-70 overflow-scroll">
    <!-- Repeat similar list items for other contacts -->
      <li class="cursor-pointer mb-2">
          <div class="flex items-center p-2 rounded-lg bg-blue-100 shadow relative">
              <div class="relative flex-shrink-0 flex-grow-0">
                <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Rick" alt="Profile Image">
                <span class="absolute bottom-0 right-3 bg-green-600 w-2 h-2 rounded-full"></span>
              </div>
              <div class="flex-grow overflow-hidden">
                  <div class="">
                      <div class="font-semibold">Rick Morris</div>
                      <div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">Michelle, let's go for a walk tomorrow?</div>
                  </div>
                  <span class="absolute top-2 right-2 text-blue-500 text-sm">10:45</span>
              </div>
          </div>
      </li>
      <li class="cursor-pointer mb-2">
          <div class="flex items-center p-2 rounded-lg bg-white shadow relative">
              <div class="relative flex-shrink-0 flex-grow-0">
                <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Ashley" alt="Profile Image">
                <span class="absolute bottom-0 right-3 bg-green-600 w-2 h-2 rounded-full"></span>
              </div>
              <div class="flex-grow overflow-hidden">
                  <div class="">
                      <div class="font-semibold">Ashley Adams</div>
                      <div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">Hey how are you doing today?</div>
                  </div>
                  <span class="absolute top-2 right-2 text-blue-500 text-sm">10:15</span>
                  <span class="absolute top-6 right-1 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">1</span>
              </div>
          </div>
      </li>
      <li class="cursor-pointer mb-2">
          <div class="flex items-center p-2 rounded-lg bg-white shadow relative">
              <div class="relative flex-shrink-0 flex-grow-0">
                <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Jane" alt="Profile Image">
                <span class="absolute bottom-0 right-3 bg-gray-500 w-2 h-2 rounded-full"></span>
              </div>
              <div class="flex-grow overflow-hidden">
                  <div class="">
                      <div class="font-semibold">Jane</div>
                      <div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">Hey, how are you doing?</div>
                  </div>
                  <span class="absolute top-2 right-2 text-blue-500 text-sm">11:45</span>
                  <span class="absolute top-6 right-1 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">10</span>
              </div>
          </div>
      </li>
  </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationListComponent {
  @HostBinding('class') className = 'w-1/4 bg-gray-100 p-4 w-100 h-100';
}

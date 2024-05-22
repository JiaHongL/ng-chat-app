import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="bg-gray-200 h-screen flex items-center justify-center">
    <div class="flex w-4/5 h-4/5 bg-white rounded-lg shadow-lg">
        <!-- Sidebar -->
        <div class="w-1/4 bg-gray-100 p-4">
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
        </div>
        <!-- Chat area -->
        <div class="flex-1 flex flex-col">
          <div class="flex items-center p-4 border-b">
            <div class="relative">
              <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Rick" alt="Profile Image">
              <span class="absolute bottom-0 right-3 bg-green-400 w-2 h-2 rounded-full"></span>
            </div>
            <div>
              <div class="font-semibold text-xl">Rick Morris</div>
              <div class="text-gray-500 text-sm">Online</div>
            </div>
          </div>
          <div class="flex-1 p-4 overflow-y-auto">

            <div class="mb-4">
              <div class="flex items-center mb-2">
                <img class="w-6 h-6 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Rick" alt="Profile Image">
                <div class="text-sm font-semibold">Rick Morris</div>
              </div>
              <div class="bg-gray-200 p-2 rounded-lg mr-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div class="text-left text-xs text-gray-500 mt-1">17:45</div>
            </div>

            <div class="mb-4">
              <div class="flex items-center mb-2">
                <img class="w-6 h-6 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Rick" alt="Profile Image">
                <div class="text-sm font-semibold">Rick Morris</div>
              </div>
              <div class="bg-gray-200 p-2 rounded-lg mr-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit?
              </div>
              <div class="text-left text-xs text-gray-500 mt-1">17:46</div>
            </div>

            <div class="flex justify-end mb-4">
              <div>
                <div class="bg-blue-500 text-white p-2 rounded-lg ml-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div class="text-right text-xs text-gray-500 mt-1">17:50</div>
              </div>
            </div>

            <div class="flex justify-end mb-4">
              <div>
                <div class="bg-blue-500 text-white p-2 rounded-lg ml-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div class="text-right text-xs text-gray-500 mt-1">17:50</div>
              </div>
            </div>

            <!-- Repeat similar message blocks for chat messages -->
          </div>
          <div class="p-4 border-t">
            <div class="flex items-center">
              <textarea placeholder="Type Your Message Here" class="w-full p-2 rounded-lg bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows="2" style="line-height: 1.5;"></textarea>
              <button class="ml-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21l21-9-21-9v7l15 2-15 2v7z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- Online/Offline users list -->
        <div class="w-1/5 bg-gray-100 p-4 flex flex-nowrap flex-col">
            <div class="flex-grow-0">
              <h3 class="font-semibold text-sm text-green-500">Online</h3>
            </div>
            <div class="flex-0 mb-3 overflow-scroll">
                <ul>
                    <li class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-white">
                        <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=joe" alt="Profile Image">
                        <div>
                            <div class="font-semibold text-gray-700">Joe</div>
                        </div>
                    </li>
                    <li class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-white">
                        <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=david" alt="Profile Image">
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
                    <li class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50">
                        <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=john" alt="Profile Image">
                        <div>
                            <div class="font-semibold text-gray-700">John</div>
                        </div>
                    </li>
                    <li class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50">
                        <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=linda" alt="Profile Image">
                        <div>
                            <div class="font-semibold text-gray-700">Linda</div>
                        </div>
                    </li>
                    <li class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50">
                        <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed=jane" alt="Profile Image">
                        <div>
                            <div class="font-semibold text-gray-700">Jane</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent { }

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent {
  @HostBinding('class') class = 'flex-1 flex flex-col';
}

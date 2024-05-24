import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, computed, effect, inject, signal, viewChild } from '@angular/core';
import { ChatStore } from '../../../store/chat.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule
  ],
  template: `
  <div class="flex items-center p-4 border-b overflow-hidden">
    <div class="relative">
      <img class="w-10 h-10 rounded-full mr-2" [src]="currentChatPartnerAvatarUrl()" alt="Profile Image">
      @if(store.currentChatPartner()?.status === 'online'){
        <span class="absolute bottom-0 right-3 bg-green-400 w-2 h-2 rounded-full"></span>
      }@else {
        <span class="absolute bottom-0 right-3 bg-gray-500 w-2 h-2 rounded-full"></span>
      }

    </div>
    <div>
      <div class="flex items-center font-semibold text-xl text-nowrap overflow-hidden text-ellipsis">
        <div class="mr-1">
          {{  store.currentChatPartner()?.username }}
        </div>
        @if(store.currentChatPartner()?.username === 'general'){
          <span class="text-sm text-gray-500">
            ({{ store.users().length }})
          </span>
        }
      </div>
      <div class="text-gray-500 text-sm">{{  store.currentChatPartner()?.status }}</div>
    </div>
  </div>
  <div class="flex-1 p-4 overflow-y-auto" #chatBox>
    <!-- Repeat similar message blocks for chat messages -->
    @for (message of store.currentChatMessages(); track message.room) {

      @if(message.sender === store.userInfo()?.username){
        <div class="flex justify-end mb-4">
          <div>
            <div class="bg-blue-500 text-white p-2 rounded-lg ml-10 whitespace-pre-wrap" [innerHTML]="message.message"></div>
            <div class="text-right text-xs text-gray-500 mt-1">
              {{ message.date | date: 'HH:mm' }}
            </div>
          </div>
        </div>
      }@else{
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <img class="w-6 h-6 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed={{message.sender}}" alt="Profile Image">
            <div class="text-sm font-semibold">{{ message.sender }}</div>
          </div>
          <div class="bg-gray-200 p-2 rounded-lg mr-8 whitespace-pre-wrap" [innerHTML]="message.message"></div>
          <div class="text-left text-xs text-gray-500 mt-1">{{ message.date | date: 'HH:mm' }}</div>
        </div>
      }

    }
  </div>
  <div class="p-4 border-t">
    <div class="flex items-center">
      <textarea 
        [(ngModel)]="message"
        placeholder="Type Your Message Here" 
        class="w-full p-2 rounded-lg bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
        rows="2" 
        style="line-height: 1.5;"
        (keydown.enter)="sendMessage($event)"
      ></textarea>
      <button class="ml-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center" (click)="sendMessage()">
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
  @HostBinding('class') class = 'flex-1 flex flex-col min-w-[250px]';
  store = inject(ChatStore);
  chatBox = viewChild<ElementRef<HTMLDivElement>>('chatBox');
  message = signal<string>('');

  currentChatPartnerAvatarUrl = computed(() => {
    const partner = this.store.currentChatPartner();
    if(partner?.username === 'general'){
      return 'https://api.dicebear.com/8.x/initials/svg?seed=General';
    }else{
      return `https://api.dicebear.com/8.x/pixel-art/svg?seed=${this.store.currentChatPartner()?.username}`;
    }
  });

  chatPartnerChangeEffect = effect(() => {
    const chatPartner = this.store.currentChatPartner();
    if(chatPartner){
      setTimeout(() => {
        this.chatBox()?.nativeElement.scrollTo(0, this.chatBox()?.nativeElement.scrollHeight as number);
      });
    }
  });

  currentChatMessagesChangeEffect = effect(() => {
    const currentChatMessages = this.store.currentChatMessages();
    if(currentChatMessages){
      setTimeout(() => {
        this.chatBox()?.nativeElement.scrollTo(0, this.chatBox()?.nativeElement.scrollHeight as number);
      });
    }
  });

  unreadCountsChangeEffect = effect(() => {
    const unreadCounts = this.store.unreadCounts()
    const room = this.store.currentRoom();
    // 已讀私人訊息的房間(別人傳來的訊息)，名稱為 `private_${對方的使用者名稱}_${自己的使用者名稱}`，就是已讀對方傳送的訊息
    const receiveRoom = `private_${this.store.currentChatPartner()?.username}_${this.store.userInfo()?.username}`;
    if(
      room === 'general'&& 
      unreadCounts[room] > 0
    ){
      this.store.markGeneralAsRead();
      console.log('Marked general as read');
    }
    if(
      room !== 'general' && 
      unreadCounts[receiveRoom] > 0
    ){
      this.store.markPrivateAsRead(receiveRoom);
    }
  });

  sendMessage(event?:Event){
    const message = this.message();
    if(event){event.preventDefault();}
    if((event as KeyboardEvent)?.isComposing || message.trim() === ''){return;}

    const room = this.store.currentRoom();
    
    if(room === 'general'){
      this.store.sendGeneralMessage(message);
    }else{
      this.store.sendPrivateMessage(message);
    }

    this.message.set('');
  }

}

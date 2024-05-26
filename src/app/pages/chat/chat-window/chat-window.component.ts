import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, computed, effect, inject, signal, viewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ViewService } from '../../../services/view.service';
import { ChatStore } from '../../../store/chat.store';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    PickerComponent
  ],
  template: `
  <!-- 頂部 -->
  <div 
    class="flex flex-shrink-0 items-center p-4 border-b overflow-hidden" 
    (click)="isShowEmojiMart.set(false)"
  >
    <div class="flex items-center p-2 bg-white" (click)="viewService.goBack();isShowEmojiMart.set(false)">
        <button class="block sm:hidden text-blue-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <div class="block sm:hidden bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center" *ngIf="store.allUnreadCount() > 0">
          {{ store.allUnreadCount() }}
        </div>
    </div>
    <div class="relative">
      <img class="w-10 h-10 rounded-full mr-2" [src]="currentChatPartnerAvatarUrl()" alt="Profile Image">
      @if(store.currentChatPartner()?.status === 'online'){
        <span class="absolute bottom-0 right-3 bg-green-400 w-2 h-2 rounded-full"></span>
      }@else {
        <span class="absolute bottom-0 right-3 bg-gray-500 w-2 h-2 rounded-full"></span>
      }

    </div>
    <div>
      <div class="flex items-center font-semibold">
        <div class="mr-1 text-xl max-w-[250px] sm:max-w-[350px] text-nowrap overflow-hidden text-ellipsis">
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
  <!-- 中間訊息 -->
  <div 
    class="flex-grow-0 p-4 overflow-y-auto"
    [ngStyle]="dynamicHeight()"
    #chatBox
    (click)="isShowEmojiMart.set(false)"
  >
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
          <div class="w-fit bg-gray-200 p-2 rounded-lg mr-8 whitespace-pre-wrap" [innerHTML]="message.message"></div>
          <div class="text-left text-xs text-gray-500 mt-1">{{ message.date | date: 'HH:mm' }}</div>
        </div>
      }

    }
  </div>
  <!-- 輸入框 -->
  <div class="p-4 border-t flex-shrink-0">
    <div class="flex items-center">
      <textarea 
        #textArea
        [(ngModel)]="message"
        placeholder="Type Your Message Here" 
        class="w-full p-2 rounded-lg bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
        rows="2" 
        style="line-height: 1.5;"
        (focus)="saveSelection()" 
        (blur)="saveSelection();viewService.resetScroll()"
        (keydown.enter)="sendMessage($event)"
      ></textarea>
      <button class="ml-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center" (click)="sendMessage()">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 21l21-9-21-9v7l15 2-15 2v7z"></path>
        </svg>
      </button>
      <div class="hidden sm:block p-2 text-4xl cursor-pointer" (click)="isShowEmojiMart.set(!isShowEmojiMart())">
        😀
      </div>
    </div>
  </div>
  @if(isShowEmojiMart()){
    <div class="hidden sm:block  absolute bottom-[85px] right-[10px] z-40">
      <emoji-mart (emojiClick)="addEmoji($event)"></emoji-mart>
    </div>
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent {
  @HostBinding('class') class = 'relative pl-0 sm:pl-3 flex-1 flex flex-col min-w-[250px] sm:h-auto';
  store = inject(ChatStore);
  chatBox = viewChild<ElementRef<HTMLDivElement>>('chatBox');
  message = signal<string>('');
  viewService = inject(ViewService);

  dynamicHeight = signal({
    height: 'calc(100vh - 180px)'
  });
  isShowEmojiMart = signal<boolean>(false);
  textArea = viewChild<ElementRef<HTMLTextAreaElement>>('textArea');
  cursorStart = 0;
  cursorEnd = 0;

  constructor() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    if(isMobileDevice){
      this.dynamicHeight.set({
        height: 'calc(100vh - 290px)'
      });
    }
    this.viewService.getCurrentView$().subscribe((view) => {
      if(view === 'chatWindow'){
        this.chatBoxScrollToBottom();
      }
    });
  }

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
        this.chatBoxScrollToBottom();
        this.isShowEmojiMart.set(false);
      });
    }
  });

  currentChatMessagesChangeEffect = effect(() => {
    const currentChatMessages = this.store.currentChatMessages();
    if(currentChatMessages){
      this.chatBoxScrollToBottom();
    }
  });

  unreadCountsChangeEffect = effect(() => {
    const unreadCounts = this.store.unreadCounts()
    const room = this.store.currentRoom();
    const currentView = this.viewService.currentView();
    const isMobile = this.viewService.isMobile();

    // 已讀私人訊息的房間(別人傳來的訊息)，名稱為 `private_${對方的使用者名稱}_${自己的使用者名稱}`，就是已讀對方傳送的訊息
    const receiveRoom = `private_${this.store.currentChatPartner()?.username}_${this.store.userInfo()?.username}`;

    // 如果是手機裝置，且當前視圖不是聊天視圖，就不標記已讀
    if(
      isMobile &&
      currentView !== 'chatWindow'
    ){
      return;
    }

    if(
      room === 'general'&& 
      unreadCounts[room] > 0
    ){
      this.store.markGeneralAsRead();
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
    this.isShowEmojiMart.set(false);
    this.viewService.resetScroll();
  }

  addEmoji(event:any){
    const textAreaElement = this.textArea()?.nativeElement;
    if (textAreaElement) {
      this.insertAtCursor(textAreaElement, event.emoji.native);
    }
  }

  saveSelection() {
    const textarea = this.textArea()?.nativeElement;
    this.cursorStart = textarea?.selectionStart as number;
    this.cursorEnd = textarea?.selectionEnd as number;
  }

  insertAtCursor(myField: HTMLTextAreaElement, myValue: string) {
    // 保存當前的 scrollTop 位置，以便插入 emoji 後恢復
    const scrollTop = myField.scrollTop;
    const text = this.message();
    if (this.cursorStart !== undefined && this.cursorEnd !== undefined) {
      this.message.set(text.substring(0, this.cursorStart) + myValue + text.substring(this.cursorEnd, text.length));
      this.cursorStart = this.cursorStart + myValue.length;
      this.cursorEnd = this.cursorStart;
    } else {
      this.cursorStart = this.message().length;
      this.cursorEnd = this.message().length;
      this.message.set(text + myValue);
    }
    // 恢復 scrollTop 位置
    setTimeout(() => {
      myField.scrollTop = scrollTop;
      myField.selectionStart = this.cursorStart;
      myField.selectionEnd = this.cursorEnd;
      myField.focus();
    });
  }

  chatBoxScrollToBottom(){
    setTimeout(() => {
      this.chatBox()?.nativeElement.scrollTo(0, this.chatBox()?.nativeElement.scrollHeight as number);
    });
  }

}

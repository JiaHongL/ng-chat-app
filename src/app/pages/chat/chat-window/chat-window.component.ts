import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, computed, effect, inject, input, signal, viewChild, untracked} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ViewService } from '../../../services/view.service';
import { ChatStore } from '../../../store/chat.store';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    PickerComponent,
    ImageUploadComponent,
    ImagePreviewComponent
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
        <div 
          class="block sm:hidden bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
          [ngClass]="{ 
            'w-7': store.allUnreadCount() > 99, 
          }" 
          *ngIf="store.allUnreadCount() > 0"
        >
          {{ store.allUnreadCount() }}
        </div>
    </div>
    <div class="relative h-10">
      @if(store.currentChatPartner()?.username){
        <img class="w-10 h-10 rounded-full mr-2" [src]="currentChatPartnerAvatarUrl()" alt="Profile Image">
        @if(store.currentChatPartner()?.status === 'online'){
          <span class="absolute bottom-0 right-3 bg-green-400 w-2 h-2 rounded-full"></span>
        }@else {
          <span class="absolute bottom-0 right-3 bg-gray-500 w-2 h-2 rounded-full"></span>
        }
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
        <!-- 自己傳的訊息 -->
        @if(message.isRecalled){
          <!-- 收回 -->
          <div class=" flex justify-end mb-5">
            <div class="bg-gray-100 p-2 rounded-lg">
              <p class="text-sm text-gray-500 italic">Message recalled</p>
              <button class="text-xs text-blue-500 hover:underline" (click)="store.undoRecallMessage(message.room, message.id)">Undo Recall</button>
            </div>
          </div>
        }@else {
          <!-- 顯示 -->
          <div class=" flex justify-end pb-5 group">
            <div class="flex ml-10 relative">
              <div class="flex flex-col justify-end text-right text-xs text-gray-500 mt-1">
                @if(store.currentChatPartner()?.username !== 'general' && message.isRead){
                  <span class="text-[10px] fon-size text-green-500">Read</span>
                }
                @if(store.currentChatPartner()?.username === 'general' && message?.readBy && message.readBy.length > 1){
                  <span class="text-[10px] text-green-500 text-nowrap">Read {{ message.readBy.length - 1}} </span>
                }
                <div>
                  {{ message.date | date: 'HH:mm' }}
                </div>
              </div>
              @if(message?.message?.includes('data:image')){
                <div class="ml-1 bg-blue-500 p-2 rounded-lg">
                  <img
                    (click)="openImagePreview(message.message)"
                    class="cursor-pointer max-w-[200px] max-w-[200px] ml-auto rounded-lg ml-1" 
                    [src]="message.message" 
                    alt="Image"
                  >
                </div>
              }@else {
                <div class="ml-1 bg-blue-500 text-white p-2 rounded-lg whitespace-pre-wrap" [innerHTML]="message.message"></div>
              }
                <div class="hidden group-hover:flex absolute bottom-[-25px] right-[4px] z-10">
                  <button class="text-xs bg-red-400 rounded-md text-white px-2 py-1" (click)="store.recallMessage(message.room, message.id)">Recall</button>
                </div>
            </div>
          </div>
        }
      }@else{
        <!-- 別人傳的訊息 -->
        @if(message.isRecalled){
          <!-- 收回 -->
          @if(store.currentChatPartner()?.username === 'general'){
            <div class="flex items-center mb-2">
              <img class="w-6 h-6 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed={{message.sender}}" alt="Profile Image">
              <div class="text-sm font-semibold">{{ message.sender }}</div>
            </div>
          }
          <div class=" flex justify-start mb-4">
            <div class="bg-gray-100 p-2 rounded-lg mb-2">
              <p class="text-sm text-gray-500 italic" id="recalledMessageText"> Message recalled</p>
            </div>
          </div>
        }@else{
          <!-- 顯示 -->
          <div class="mb-5">
            <div class="flex items-center mb-2">
              <img class="w-6 h-6 rounded-full mr-2" src="https://api.dicebear.com/8.x/pixel-art/svg?seed={{message.sender}}" alt="Profile Image">
              <div class="text-sm font-semibold">{{ message.sender }}</div>
            </div>
            <div class="mr-8 flex">
              @if(message?.message?.includes('data:image')){
                <div class="mr-1 bg-blue-500 p-2 rounded-lg">
                  <img
                    (click)="openImagePreview(message.message)" 
                    class="cursor-pointer max-w-[200px] max-w-[200px] ml-auto rounded-lg ml-1" 
                    [src]="message.message" 
                    alt="Image"
                  >
                </div>
              }@else {
                <div class="mr-1 w-fit bg-gray-200 p-2 rounded-lg whitespace-pre-wrap" [innerHTML]="message.message"></div>
              }
              <div class="self-end text-left text-xs text-gray-500 mt-1">{{ message.date | date: 'HH:mm' }}</div>
            </div>
          </div>
        }
      }
    }
  </div>
  <!-- 輸入框 -->
  <div class="p-4 border-t flex-shrink-0">
    <div class="flex items-center">

      <textarea 
        #textArea
        [disabled]="!store.currentChatPartner()?.username"
        [(ngModel)]="message"
        placeholder="Type Your Message Here" 
        class="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        rows="2" 
        style="line-height: 1.5;"
        (focus)="saveSelection()" 
        (blur)="saveSelection();viewService.resetScroll()"
        (keydown.enter)="sendMessage($event)"
      ></textarea>

      <button
        [disabled]="!store.currentChatPartner()?.username"
        (click)="sendMessage()" 
        class="flex items-center justify-center w-10 h-10 ml-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <button 
        (click)="isShowEmojiMart.set(!isShowEmojiMart())"
        [disabled]="!store.currentChatPartner()?.username" 
        class="hidden sm:flex items-center justify-center w-10 h-10 ml-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
      </button>

      <app-image-upload />

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

  usageContext = input.required<'desktop'|'mobile'>();

  store = inject(ChatStore);
  viewService = inject(ViewService);

  chatBox = viewChild<ElementRef<HTMLDivElement>>('chatBox');
  message = signal<string>('');

  dynamicHeight = signal({
    height: 'calc(100vh - 180px)'
  });

  isShowEmojiMart = signal<boolean>(false);

  textArea = viewChild<ElementRef<HTMLTextAreaElement>>('textArea');
  cursorStart = 0;
  cursorEnd = 0;

  dialog = inject(Dialog);

  constructor() {
    if (this.viewService.isRaelMobile) {
      this.dynamicHeight.set({
        height: 'calc(100vh - 290px)'
      });
    }
    effect(() => {
      const currentView = this.viewService.currentView();
      if (currentView === 'chatWindow') {
        this.chatBoxScrollToBottom();
      }
    });
  }

  currentChatPartnerAvatarUrl = computed(() => {
    const partner = this.store.currentChatPartner();
    if (partner?.username === 'general') {
      return 'https://api.dicebear.com/8.x/initials/svg?seed=General';
    } else {
      return `https://api.dicebear.com/8.x/pixel-art/svg?seed=${this.store.currentChatPartner()?.username}`;
    }
  });

  chatPartnerChangeEffect = effect(() => {
    const chatPartner = this.store.currentChatPartner();
    if (chatPartner) {
      setTimeout(() => {
        this.chatBoxScrollToBottom();
        this.isShowEmojiMart.set(false);
      });
    }
  });

  currentChatMessagesChangeEffect = effect(() => {
    const currentChatMessages = this.store.currentChatMessages();
    const isAutoScrollEnabled = untracked(()=> this.store.isAutoScrollEnabled());
    if (
      isAutoScrollEnabled &&
      currentChatMessages 
    ) {
      this.chatBoxScrollToBottom();
    }
  });

  unreadCountsChangeEffect = effect(() => {
    const unreadCounts = this.store.unreadCounts()
    const room = this.store.currentRoom();
    const currentView = this.viewService.currentView();
    const isMobile = this.viewService.isMobile();
    const usageContext = this.usageContext();
    const currentChatPartnerUsername = this.store.currentChatPartner()?.username as string;

    if(!currentChatPartnerUsername){
      return;
    }

    // 已讀私人訊息的房間(別人傳來的訊息)，名稱為 `private_${對方的使用者名稱}_${自己的使用者名稱}`，就是已讀對方傳送的訊息
    const receiveRoom = `private_${this.store.currentChatPartner()?.username}_${this.store.userInfo()?.username}`;

    // 如果是手機裝置，且當前視圖不是聊天視圖，就不標記已讀
    if (
      isMobile &&
      currentView !== 'chatWindow'
    ) {
      return;
    }

    // 如果是在 general 房間，且有未讀訊息，就標記已讀
    if (
      room === 'general' &&
      unreadCounts['general'] > 0
    ) {
      this.store.markGeneralAsRead();
      return;
    }

    // 如果是在私人房間，且有未讀訊息，就標記已讀
    if (
      (
        isMobile &&  usageContext =='mobile' &&
        room !== 'general' &&
        unreadCounts[receiveRoom] > 0
      )||
      (
        !isMobile && usageContext =='desktop' &&
        room !== 'general' &&
        unreadCounts[receiveRoom] > 0
      )
    ) {
      this.store.markPrivateAsRead(receiveRoom);
    }

  });

  sendMessage(event?: Event) {
    const message = this.message();
    if (event) { event.preventDefault(); }
    if ((event as KeyboardEvent)?.isComposing || message.trim() === '') { return; }

    const room = this.store.currentRoom();
    if (room === 'general') {
      this.store.sendGeneralMessage(message);
    } else {
      this.store.sendPrivateMessage(message);
    }

    this.message.set('');
    this.isShowEmojiMart.set(false);
    this.viewService.resetScroll();
  }

  addEmoji(event: any) {
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

  chatBoxScrollToBottom() {
    setTimeout(() => {
      this.chatBox()?.nativeElement.scrollTo(0, this.chatBox()?.nativeElement.scrollHeight as number);
    });
  }

  openImagePreview(imageUrl: string) {
    this.dialog.open(ImagePreviewComponent, {
      data: {
        base64String: imageUrl
      }
    });
  }

}

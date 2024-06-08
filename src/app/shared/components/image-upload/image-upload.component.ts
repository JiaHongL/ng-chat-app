import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, viewChild, ChangeDetectorRef, inject, input, output } from '@angular/core';
import { ChatStore } from '../../../store/chat.store';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div>
      <input 
        #uploadInput 
        hidden 
        type="file" 
        (change)="onFileSelected($event)"
        accept="image/jpeg,image/png,image/gif,image/bmp,image/svg+xml,image/webp" 
      />
      <button
        [disabled]="!store.currentChatPartner()?.username"
        (click)="onUpload()"    
        class="flex items-center justify-center w-10 h-10 ml-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </button>
    </div>
    @if(this.base64String){
      <div class="z-40 fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-[550px] max-h-[550px] sm:max-w-[800px] sm:max-h-[550px]">
          <div class="flex justify-between items-center mb-6">
            <img *ngIf="base64String" [src]="base64String" class="max-w-[450px] max-h-[450px] sm:max-w-[700px] sm:max-h-[700] mx-auto" />
          </div>
          <div class="flex justify-center space-x-4">
              <button
                type="button" 
                class="py-2 px-4 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition duration-200"
                (click)="clearSelectedFile()"
              >
                  cancel
              </button>
              <button 
                class="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:transition hover:duration-200"
                (click)="send()"
              >Send</button>
          </div>
        </div>
      </div>
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  base64String: string | null = null;
  uploadInput = viewChild<ElementRef<HTMLInputElement>>('uploadInput');
  cdr = inject(ChangeDetectorRef);
  store = inject(ChatStore);
  upload = output<string>();

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.base64String = this.setBase64Prefix(this.selectedFile?.type) + reader.result?.toString().split(',')[1] || null;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  setBase64Prefix(fileType: string | undefined): string {
    let base64Prefix = '';
    switch (fileType) {
      case 'image/jpeg':
        base64Prefix = 'data:image/jpeg;base64,';
        break;
      case 'image/png':
        base64Prefix = 'data:image/png;base64,';
        break;
      case 'image/gif':
        base64Prefix = 'data:image/gif;base64,';
        break;
      case 'image/bmp':
        base64Prefix = 'data:image/bmp;base64,';
        break;
      case 'image/svg+xml':
        base64Prefix = 'data:image/svg+xml;base64,';
        break;
      case 'image/webp':
        base64Prefix = 'data:image/webp;base64,';
        break;
      default:
        base64Prefix = '';
    }
    return base64Prefix;
  }

  send(){
    this.upload.emit(this.base64String as string);
    this.clearSelectedFile();
  }

  clearSelectedFile(): void {
    this.base64String = null; 
    this.selectedFile = null;
    (this.uploadInput() as ElementRef<HTMLInputElement>).nativeElement.value = '';
  }

  onUpload(): void {
    this.uploadInput()?.nativeElement.click();
  }

}

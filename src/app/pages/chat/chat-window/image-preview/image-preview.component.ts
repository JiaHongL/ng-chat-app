import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="z-40 fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-[550px] max-h-[550px] sm:max-w-[900px] sm:max-h-[900px]">
        <div class="flex justify-between items-center mb-6">
            <img class="flex-1" [src]="data.base64String" class="object-contain max-w-[450px] max-w-h-[450px] sm:max-w-[800px] sm:max-h-[550] mx-auto" />
        </div>
        @if(data.isPasted){
          <div class="flex justify-center space-x-4">
            <button
              type="button" 
              class="py-2 px-4 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition duration-200"
              (click)="close()"
            >
                cancel
            </button>
            <button 
              class="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:transition hover:duration-200"
              (click)="send()"
            >Send</button>
        </div>
        }@else {
          <div class="flex justify-center">
            <button (click)="close()" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">close</button>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePreviewComponent {

  dialogRef = inject(DialogRef);
  data: {
    base64String: string,
    isPasted?: boolean,
  } = inject(DIALOG_DATA);

  close() { this.dialogRef.close(); }
  send() { this.dialogRef.close('send'); }
}

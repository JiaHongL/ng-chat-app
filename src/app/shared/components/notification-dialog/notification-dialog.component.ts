import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 id="notification-title" class="text-2xl font-bold text-gray-900">提示</h2>
          <button (click)="close()" type="button" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <p id="notification-message" class="text-gray-700 mb-4">{{data.message}}</p>
        <div class="flex justify-center">
          <button (click)="close()" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">關閉</button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationDialogComponent {

  dialogRef = inject(DialogRef);
  data: {message: string} = inject(DIALOG_DATA);

  close() { 
    this.dialogRef.close(); 
  }

}

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
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-[550px] max-h-[550px] sm:max-w-[800px] sm:max-h-[800px]">
        <div class="flex justify-between items-center mb-6">
            <img [src]="data.base64String" class="max-w-[450px] max-h-[450px] sm:max-w-[700px] sm:max-h-[700] mx-auto" />
        </div>
        <div class="flex justify-center">
          <button (click)="close()" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">close</button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePreviewComponent {

  dialogRef = inject(DialogRef);
  data: {base64String: string} = inject(DIALOG_DATA);

  close() { this.dialogRef.close(); }


}

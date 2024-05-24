import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="p-10">
      <button 
        class="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:transition hover:duration-200" 
        (click)="resetData()"
      >Reset Data</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetComponent {
  userService = inject(UserService);

  resetData(){
    this.userService.resetData();
  }
}

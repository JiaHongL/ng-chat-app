import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Dialog, DialogRef } from '@angular/cdk/dialog';

import { UserService } from '../../../services/user.service';
import { NotificationDialogComponent } from '../../../shared/components/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    CommonModule,
    NotificationDialogComponent,
    FormsModule
  ],
  template: `
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Register</h2>
          <button (click)="close()" type="button" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <form #registerForm="ngForm">
          <div class="mb-4">
            <label class="block text-gray-700 mb-1" for="username">Name</label>
            <input required [(ngModel)]="username" name="username" type="text" id="username" class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="User Name">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-1" for="password">Password</label>
            <input required [(ngModel)]="password" name="password" type="password" id="password" class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password">
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" class="py-2 px-4 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition duration-200" (click)="close()">Cancel</button>
            <button 
              class="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:transition hover:duration-200" 
              [disabled]="registerForm.invalid" 
              (click)="register()"
            >Register</button>
          </div>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent {
  userService = inject(UserService);
  dialog = inject(Dialog);

  username = signal<string>('');
  password = signal<string>('');

  constructor(public dialogRef: DialogRef<string>) { }

  close() { this.dialogRef.close(); }

  register(){
    this.userService.register({
      username: this.username(),
      password: this.password()
    }).subscribe({
      next: () => {
        this.dialogRef.close();
        this.dialog.open(NotificationDialogComponent, {
          data: {
            message: 'Registration successful!'
          }
        });
      },
      error: (error) => {
        this.dialog.open(NotificationDialogComponent, {
          data: {
            message: error.error.message
          }
        });
      }
    });
  }

}

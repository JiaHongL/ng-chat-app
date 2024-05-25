import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { Dialog } from '@angular/cdk/dialog';

import { UserService } from '../../services/user.service';
import { ViewStateService } from './../../services/view-state.service';

import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { NotificationDialogComponent } from '../../shared/components/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RegisterDialogComponent,
    NotificationDialogComponent
  ],
  template: `
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-xl sm:max-w-md sm:w-full">
      <div class="flex justify-center mb-6">
        <div class="bg-blue-100 p-3 rounded-full">
          <svg class="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.93C6.17 16.93 3 13.76 3 10S6.17 3.07 10 3.07 17 6.24 17 10s-3.17 6.93-7 6.93zM10 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3c-1.1 0-2 .9-2 2v3h4v-3c0-1.1-.9-2-2-2z"></path>
          </svg>
        </div>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-2 sm:mb-4">Chat!</h2>
      <p class="text-gray-500 text-center mb-6">Don't have an account yet? <a class="text-blue-500 cursor-pointer" (click)="openRegisterDialog()">Sign up</a></p>
      <form #loginForm="ngForm">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1" for="username">Name</label>
          <input required [(ngModel)]="username" name="username" type="text" id="username" class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="User Name">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-1" for="password">Password</label>
          <input required [(ngModel)]="password" name="password" type="password" id="password" class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password">
        </div>
        <div class="flex justify-center">
          <button 
            type="button"
            class="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:transition hover:duration-200" 
            [disabled]="loginForm.invalid"
            (click)="login()"
          >Login</button>
        </div>
      </form>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  router = inject(Router);
  userService = inject(UserService);
  viewStateService = inject(ViewStateService);
  dialog = inject(Dialog);

  username = signal<string>('joe');
  password = signal<string>('abc');

  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent, {
      autoFocus: false,
    });
  }

  login() {
    const data = {
      username: this.username(),
      password: this.password(),
    };
    this.userService
      .login(data)
      .subscribe({
        next: () => {
          if(this.viewStateService.isMobile()){
            this.viewStateService.goToFriendList();
          }
          this.router.navigate(['/chat']);
        },
        error: () => {
          this.dialog.open(NotificationDialogComponent, {
            data: { message: 'Login failed!' }
          });
        }
      });
  }

}

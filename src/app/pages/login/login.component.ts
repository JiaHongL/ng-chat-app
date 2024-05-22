import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <!-- Login page -->
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <div class="flex justify-center mb-6">
        <div class="bg-blue-100 p-3 rounded-full">
          <!-- Icon placeholder, replace with your logo -->
          <svg class="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.93C6.17 16.93 3 13.76 3 10S6.17 3.07 10 3.07 17 6.24 17 10s-3.17 6.93-7 6.93zM10 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3c-1.1 0-2 .9-2 2v3h4v-3c0-1.1-.9-2-2-2z"></path>
          </svg>
        </div>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-4">Chat!</h2>
      <p class="text-gray-500 text-center mb-6">Don't have an account yet? <a class="text-blue-500" (click)="isShowModal.set(true)">Sign up</a></p>
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1" for="email">Name</label>
          <input type="email" id="email" class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="User Name">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-1" for="password">Password</label>
          <input type="password" id="password" class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password">
        </div>
        <button type="submit" class="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200" (click)="login()">Login</button>
      </form>
    </div>
  </div>

  <!-- Overlay -->
  @if(isShowModal()){
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <!-- Registration Modal -->
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Register</h2>
          <button class="text-gray-400 hover:text-gray-600" (click)="isShowModal.set(false)">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <form>
          <div class="mb-4">
            <label class="block text-gray-700 mb-1" for="username">Name</label>
            <input type="text" id="username" class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="User name">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-1" for="password">Password</label>
            <input type="password" id="password" class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password">
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" class="py-2 px-4 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition duration-200" (click)="isShowModal.set(false)">Cancel</button>
            <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200" (click)="isShowModal.set(false)">Register</button>
          </div>
        </form>
      </div>
    </div>
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  router = inject(Router);
  isShowModal = signal(false);

  login(){
    this.router.navigate(['/chat']);
  }
}

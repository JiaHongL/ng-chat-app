import type { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  if (!userService.isLoggedIn()) {
    userService.logout();
    return false;
  }
  return true;
};

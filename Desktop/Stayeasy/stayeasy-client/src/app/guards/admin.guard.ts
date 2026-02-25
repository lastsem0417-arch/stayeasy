import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    router.navigate(['/user/rooms']);
    return false;
  }
  return true;
};
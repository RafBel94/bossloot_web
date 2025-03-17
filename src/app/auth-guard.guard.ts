import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('angular19User');
  if (user !== null) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

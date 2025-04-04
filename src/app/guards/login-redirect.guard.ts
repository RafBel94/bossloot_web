import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginRedirectGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('bosslootUser');
  const router = inject(Router);
  if (user !== null) {
    router.navigate(['/dashboard']);
    return false;
  }
  
  return true;
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      if (payload.role === 'admin') {
        return true;  // Allow if role is admin
      }
    } catch (e) {
      console.error('Invalid token', e);
    }
  }

  alert('Access Denied! Admins only.');
  router.navigate(['/login']);  // Redirect non-admins
  return false;
};

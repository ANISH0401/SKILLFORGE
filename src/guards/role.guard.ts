import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/user.model';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUser();

  if (!currentUser) {
    // This should be caught by the main authGuard first, but it's a safeguard.
    return router.parseUrl('/login');
  }

  const expectedRoles = route.data['roles'] as Role[];
  const userRole = currentUser.role;

  if (expectedRoles && expectedRoles.includes(userRole)) {
    return true;
  }

  // If the user has a different role, redirect them to their own correct dashboard.
  const redirectUrl = authService.getRoleBasedRedirectUrl(userRole);
  return router.parseUrl(redirectUrl);
};

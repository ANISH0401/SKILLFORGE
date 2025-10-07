import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, Role } from '../models/user.model';

// For the mock service, we'll store the password alongside the user data internally.
type UserWithPassword = User & { password: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  readonly currentUser = signal<User | null>(null);
  readonly isLoggedIn = computed(() => !!this.currentUser());

  // A simple in-memory array to act as a mock user database.
  private readonly _users: UserWithPassword[] = [
    { id: 'user-1', name: 'Alex Johnson', email: 'student@skillforge.com', role: 'Student', password: 'password123' },
    { id: 'user-2', name: 'Dr. Evelyn Reed', email: 'instructor@skillforge.com', role: 'Instructor', password: 'password123' },
    { id: 'user-3', name: 'Samira Khan', email: 'admin@skillforge.com', role: 'Admin', password: 'password123' },
  ];

  constructor() {
    const storedUser = localStorage.getItem('skillforge_user');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }

    effect(() => {
      if (!this.isLoggedIn()) {
        localStorage.removeItem('skillforge_user');
        localStorage.removeItem('skillforge_token');
      }
    });
  }

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = this._users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        if (foundUser) {
          // Create a user object without the password to use in the app
          const user: User = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role
          };
          
          const fakeJwt = 'fake-jwt-token.' + btoa(JSON.stringify(user));
          localStorage.setItem('skillforge_user', JSON.stringify(user));
          localStorage.setItem('skillforge_token', fakeJwt);
          this.currentUser.set(user);
          resolve(user);
        } else {
          reject('Invalid credentials');
        }
      }, 1000);
    });
  }

  register(name: string, email: string, password: string): Promise<User> {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const existingUser = this._users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                return reject('An account with this email already exists.');
            }

            const newUser: UserWithPassword = { 
                id: `user-${Date.now()}`, 
                name, 
                email, 
                role: 'Student', // All new registrations are Students by default
                password 
            };
            this._users.push(newUser);

            // Create a user object without the password to log them in
            const userForSession: User = {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role
            };

            const fakeJwt = 'fake-jwt-token.' + btoa(JSON.stringify(userForSession));
            localStorage.setItem('skillforge_user', JSON.stringify(userForSession));
            localStorage.setItem('skillforge_token', fakeJwt);
            this.currentUser.set(userForSession);
            resolve(userForSession);
        }, 1000);
     });
  }

  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getRoleBasedRedirectUrl(role: Role): string {
    switch (role) {
      case 'Student':
        return '/dashboard/student';
      case 'Instructor':
        return '/dashboard/instructor';
      case 'Admin':
        return '/dashboard/admin';
      default:
        return '/dashboard';
    }
  }
}
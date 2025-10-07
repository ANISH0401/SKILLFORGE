import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentDashboardComponent } from './components/student/student-dashboard.component';
import { InstructorDashboardComponent } from './components/instructor/instructor-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
          { 
            path: 'student', 
            component: StudentDashboardComponent,
            canActivate: [roleGuard],
            data: { roles: ['Student'] }
          },
          { 
            path: 'instructor', 
            component: InstructorDashboardComponent,
            canActivate: [roleGuard],
            data: { roles: ['Instructor'] }
          },
          { 
            path: 'admin', 
            component: AdminDashboardComponent,
            canActivate: [roleGuard],
            data: { roles: ['Admin'] }
          },
          { path: '', redirectTo: 'student', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: '**', redirectTo: '/login' }
    ], withHashLocation())
  ]
};
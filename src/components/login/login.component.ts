import { ChangeDetectionStrategy, Component, inject, signal, DestroyRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly roles: Role[] = ['Student', 'Instructor', 'Admin'];

  readonly loginForm = new FormGroup({
    role: new FormControl<Role>('Student', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('student@skillforge.com', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('password123', { nonNullable: true, validators: [Validators.required] })
  });

  constructor() {
    this.loginForm.controls.role.valueChanges.pipe(
      startWith(this.loginForm.controls.role.value),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(role => {
        if (!role) return;

        let email = '';
        switch (role) {
          case 'Student':
            email = 'student@skillforge.com';
            break;
          case 'Instructor':
            email = 'instructor@skillforge.com';
            break;
          case 'Admin':
            email = 'admin@skillforge.com';
            break;
        }
        this.loginForm.controls.email.setValue(email);
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password)
      .then(user => {
        const redirectUrl = this.authService.getRoleBasedRedirectUrl(user.role);
        this.router.navigate([redirectUrl]);
      })
      .catch(err => {
        this.errorMessage.set(String(err));
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }
}
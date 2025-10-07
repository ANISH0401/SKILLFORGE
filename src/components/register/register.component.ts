import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// Fix: Use FormGroup and FormControl instead of FormBuilder to resolve injection issue.
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink]
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // Fix: Replaced FormBuilder.group with new FormGroup and new FormControl to avoid injection issue.
  readonly registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    const { name, email, password } = this.registerForm.value;

    this.authService.register(name!, email!, password!)
      .then(user => {
        const redirectUrl = this.authService.getRoleBasedRedirectUrl(user.role);
        this.router.navigate([redirectUrl]);
      })
      .catch(err => {
        this.errorMessage.set(err);
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }
}

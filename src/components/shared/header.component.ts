import { ChangeDetectionStrategy, Component, output, inject, input, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  user = input.required<User>();
  toggleSidebar = output<void>();
  
  private readonly authService = inject(AuthService);
  
  readonly isDropdownOpen = signal(false);

  onLogout(): void {
    this.authService.logout();
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(open => !open);
  }
}

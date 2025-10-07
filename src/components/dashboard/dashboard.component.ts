import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../shared/sidebar.component';
import { HeaderComponent } from '../shared/header.component';
import { User } from '../../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent]
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = this.authService.currentUser;
  
  // Using a signal for sidebar state
  readonly isSidebarOpen = signal(true);

  toggleSidebar(): void {
    this.isSidebarOpen.update(open => !open);
  }

  ngOnInit(): void {
    const currentUser = this.user();
    if (currentUser) {
      const currentPath = this.router.url;
      const expectedPathPrefix = `/dashboard/${currentUser.role.toLowerCase()}`;
      if (!currentPath.startsWith(expectedPathPrefix)) {
        const redirectUrl = this.authService.getRoleBasedRedirectUrl(currentUser.role);
        this.router.navigate([redirectUrl], { replaceUrl: true });
      }
    }
  }
}

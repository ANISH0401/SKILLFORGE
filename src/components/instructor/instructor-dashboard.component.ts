import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstructorDashboardComponent {
  private readonly authService = inject(AuthService);
  readonly user = this.authService.currentUser;
}

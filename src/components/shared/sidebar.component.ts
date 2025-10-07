import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../models/user.model';

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive]
})
export class SidebarComponent {
  user = input.required<User>();
  isOpen = input(true);

  readonly navLinks = computed<NavLink[]>(() => {
    const role = this.user().role;
    switch (role) {
      case 'Student':
        return [
          { path: '/dashboard/student', label: 'Dashboard', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />' },
          { path: '/dashboard/student/courses', label: 'My Courses', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />' },
          { path: '/dashboard/student/exams', label: 'Exams', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />' }
        ];
      case 'Instructor':
        return [
          { path: '/dashboard/instructor', label: 'Dashboard', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />' },
          { path: '/dashboard/instructor/courses', label: 'Manage Courses', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />' },
          { path: '/dashboard/instructor/students', label: 'Students', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-4.663M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm-2.25 0a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" />' }
        ];
      case 'Admin':
        return [
          { path: '/dashboard/admin', label: 'Dashboard', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />' },
          { path: '/dashboard/admin/users', label: 'User Management', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-4.663M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm-2.25 0a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" />' },
          { path: '/dashboard/admin/settings', label: 'Settings', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-1.025 1.11-1.11a12.022 12.022 0 0 1 2.946 0c.55.085 1.02.568 1.11 1.111a12.022 12.022 0 0 1 0 2.946c-.09.542-.56 1.025-1.11 1.11a12.022 12.022 0 0 1-2.946 0c-.55-.085-1.02-.568-1.11-1.111a12.022 12.022 0 0 1 0-2.946ZM12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 0v-.004v.004Zm4.25-1.612a12.025 12.025 0 0 0 2.148-2.148c.2-.2.33-.46.33-.734V5.25c0-.274-.13-.534-.33-.734a12.025 12.025 0 0 0-2.148-2.148c-.2-.2-.46-.33-.734-.33H9.388c-.274 0-.534.13-.734.33a12.025 12.025 0 0 0-2.148 2.148c-.2.2-.33.46-.33.734v1.822c0 .274.13.534.33.734a12.025 12.025 0 0 0 2.148 2.148c.2.2.46.33.734.33h1.822c.274 0 .534-.13.734-.33Z" />' },
        ];
      default:
        return [];
    }
  });
}

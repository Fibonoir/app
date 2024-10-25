import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;


  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.authStatus$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}

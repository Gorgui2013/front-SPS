import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './cores/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username = localStorage.getItem('username');

  constructor(public authService: AuthService, private router: Router) { }

  deconnexion() {
    this.authService.signOut()
      .subscribe(res => {
        if (!res.success) {
          this.router.navigate(['/']);

        }
      });
  }

}

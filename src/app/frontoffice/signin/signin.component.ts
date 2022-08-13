import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../cores/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  error: string = null;
  formAuth: FormGroup;

  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formAuth = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  connexion() {
    if(this.formAuth.valid) {
      this.authService.signIn(this.formAuth.value)
      .subscribe(
        (data) => {
          localStorage.clear();
          localStorage.setItem('ROLE', data.user.role);
          localStorage.setItem('token', data.token);
          localStorage.setItem('STATE', 'true');
          localStorage.setItem('username', data.user.username);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('info', JSON.stringify(data.info[0]));
          this.goToDashBoard();
        },
        (error) => {
          this.error = "Nom d'utilisateur ou mot de passe incorrect !";
        }
        );
    }
  }

  goToDashBoard() {
    let role = localStorage.getItem('ROLE');
    if (role === 'COMPANY')
      this.router.navigate(['/compte/company']);
    if (role === 'USER')
      this.router.navigate(['/']);

  }

}

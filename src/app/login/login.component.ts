import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  isSubmitted = false;

  teste = { message: '', error: false };
  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private localStorage: LocalStorageService
  ) {
    this.user = this.fBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.min(2), Validators.required]],
    });
  }

  ngOnInit(): void {}

  signIn() {
    this.isSubmitted = true;

    this.authService.signInUser(this.user.value).subscribe({
      next: (res) => {
        this.localStorage.set('user', res);
        this.router.navigate(['/compra']);
        environment.user = res;
      },
      error: (err) => {
        this.router.navigate(['/login'])
        this._snackBar.open(err.error.message, 'Fechar', { duration: 2000 });
      },
    });
  }
  closeSnackBar() {
    this._snackBar.dismiss();
  }
}
export class PizzaPartyComponent {}

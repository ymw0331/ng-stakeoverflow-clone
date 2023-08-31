import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {

  }

  loginForm = this.fb.group({
    // container form controls
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })


  login() {
    this.userService.getUser(this.loginForm.value.email).then((res) => {
      console.log(res);
      if (res.length == 0) {
        console.log('account does not exist');
        this.snackbar.open('Account does not exist', 'ok');
      }
      else {
        if (res[0].password === this.loginForm.value.password) {
          console.log('correct password');
          this.userService.user = res[0];
          localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['/home']);
        }
        else {
          console.log('incorrect password');
          this.snackbar.open('Incorrect password', 'ok');
        }
      }

    }).catch((err) => {
      console.log(err);
    })
  }



}


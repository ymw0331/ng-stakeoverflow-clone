import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private router: Router
  ) { }

  createAccountForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(12)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })


  createAccount() {
    this.userService.createAccount(this.createAccountForm.value).then((res) => {
      console.log(res)
      this.userService.user = res
      localStorage.setItem('user', JSON.stringify(res))

      this.router.navigate(['/home'])

    }).catch((err) => {
      console.log(err)
    })
  }
}

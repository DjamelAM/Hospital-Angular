import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgAuthService } from '../../services/http/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(public ngAuthService: NgAuthService, private _router: Router) {}

  ngOnInit() {}

  goToSignUp() {
    this._router.navigateByUrl('/sign-up');
  }

  goToForgotPass() {
    this._router.navigateByUrl('/forgot-password');
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}

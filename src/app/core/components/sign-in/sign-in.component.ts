import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from '../../services/http/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(public ngAuthService: NgAuthService, private _router: Router) {}

  ngOnInit() {}

  goToSignUp() {
    this._router.navigateByUrl('/sign-up');
  }

  goToForgotPass() {
    this._router.navigateByUrl('/forgot-password');
  }
}

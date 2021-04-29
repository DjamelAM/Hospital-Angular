import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from 'src/app/core/services/http/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public ngAuthService: NgAuthService, private _router: Router) {}

  ngOnInit(): void {}
  goToHome() {
    this._router.navigateByUrl('/home');
  }
}

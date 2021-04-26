import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '../../services/http/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(public ngAuthService: NgAuthService) {}

  ngOnInit() {}
}

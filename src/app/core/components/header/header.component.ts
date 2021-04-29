import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgAuthService } from '../../services/http/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navbar: String;
  imageDoctor: string = '/src/assets/doctor.png';
  imagePatient: string = '/src/assets/patient.png';

  constructor(
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private location: Location,
    public authenticationService: NgAuthService
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (location.pathname.includes('/doctors')) {
      this.navbar = 'doctors';
    }
    if (location.pathname.includes('/patients')) {
      this.navbar = 'patients';
    }
    if (
      !location.pathname.includes('/patients') &&
      !location.pathname.includes('/doctors')
    ) {
      this.navbar = 'home';
    }
  }

  goBack() {
    this.location.back();
  }
  goToDoctors() {
    this._router.navigateByUrl('/doctors');
  }

  goToPatients() {
    this._router.navigateByUrl('/patients');
  }
  goToHome() {
    this._router.navigateByUrl('/home');
  }

  goToProfile() {
    this._router.navigateByUrl('/profile');
  }
}

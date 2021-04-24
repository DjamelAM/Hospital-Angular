import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private location: Location
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

  goTo() {
    if (location.pathname.includes('/doctors')) {
      this._router.navigateByUrl('/patients');
    }

    if (location.pathname.includes('/patients')) {
      this._router.navigateByUrl('/doctors');
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
    this._router.navigateByUrl('');
  }
}

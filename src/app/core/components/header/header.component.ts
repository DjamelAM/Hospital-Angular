import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  doctor: boolean;
  imageDoctor: string = '/src/assets/doctor.png';
  imagePatient: string = '/src/assets/patient.png';

  constructor(
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    /* this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['app-header']);
    }); */
  }

  ngDoCheck(): void {
    if (location.pathname.includes('/doctors')) {
      this.doctor = true;
    }
    if (location.pathname.includes('/patients')) {
      this.doctor = false;
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
}

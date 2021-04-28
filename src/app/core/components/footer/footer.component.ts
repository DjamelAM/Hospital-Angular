import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  navbar: String;
  constructor() {}

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

  goToGithub() {
    window.open('https://github.com/DjamelAM/Hospital-Angular', '_blank');
  }
}

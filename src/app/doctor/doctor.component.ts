import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctor } from '../core/models/doctor';
import { DoctorService } from '../core/services/http/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  doctors$: Observable<IDoctor[]>;
  constructor(private _doctorService: DoctorService) { }

  ngOnInit(): void {

    this.doctors$ = this._doctorService.getDoctors();
  }

}


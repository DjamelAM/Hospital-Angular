import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDoctor } from 'src/app/core/models/doctor';
import { DoctorFormData } from 'src/app/core/models/doctor-form-data';
import { IPatient } from 'src/app/core/models/patient';
import { DoctorService } from 'src/app/core/services/http/doctor.service';
import { DoctorFormComponent } from '../../components/doctor-form/doctor-form.component';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {

  doctorId: number;
  doctor: IDoctor;
  doctor$: Observable<IDoctor>;
  patients$: Observable<IPatient[]>;
  patients: IPatient[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'department', 'delete', 'update'];

  constructor(private _activateRoute: ActivatedRoute,
    private _doctorService: DoctorService,

    public dialog: MatDialog,
    private _router: Router) { }

  ngOnInit(): void {
    this.doctorId = Number(this._activateRoute.snapshot.paramMap.get('id'));

    if (this.doctorId) {
      this._doctorService.getDoctor(this.doctorId).subscribe(doctor => {
        this.doctor = doctor;
      });

      this.patients$ = this._doctorService.getPatientsByDoctor(this.doctorId);
      this._doctorService.getPatientsByDoctor(this.doctorId).subscribe(patients => this.patients = patients)
    }
  }



  delete(id) {
    this._doctorService.deleteDoctor(id).subscribe((next) => {

      this._router.navigateByUrl("doctors");
    });

  }

  loadData() {
    this._router.navigateByUrl("doctors/");
  }
  goToPatient(id) {
    this._router.navigateByUrl("patients/" + id);
  }


  openDialog(toUpdate: boolean, doctor: IDoctor) {

    const doctorFormData: DoctorFormData = {
      toUpdate: toUpdate,
      doctor: doctor
    };

    const dialogRef = this.dialog.open(DoctorFormComponent, {
      data: doctorFormData
    });

    dialogRef.afterClosed().subscribe(result => {

      this.loadData();
    });
  }


}

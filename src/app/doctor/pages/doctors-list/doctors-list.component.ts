import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDoctor } from 'src/app/core/models/doctor';
import { DoctorFormData } from 'src/app/core/models/doctor-form-data';
import { DoctorService } from 'src/app/core/services/http/doctor.service';
import { ExcelService } from 'src/app/core/services/http/excel.service';
import { DoctorFormComponent } from '../../components/doctor-form/doctor-form.component';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {
  doctors$: Observable<IDoctor[]>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'department', 'delete', 'update'];

  doctors: IDoctor[];

  constructor(private _doctorService: DoctorService, private _excelService: ExcelService, public dialog: MatDialog, private _router: Router) { }

  ngOnInit(): void {
    this.doctors$ = this._doctorService.getDoctors();
  }


  delete(id) {
    this._doctorService.deleteDoctor(id).subscribe(toto => {

      this.doctors$ = this._doctorService.getDoctors();
    });

  }

  loadData() {
    this.doctors$ = this._doctorService.getDoctors();
  }

  goToDetails(id) {
    this._router.navigateByUrl("doctors/" + id);

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


  exportAsXLSX(): void {
    this._doctorService.getDoctors().subscribe(
      patients => this.doctors = patients
    );
    this._excelService.exportAsExcelFile(this.doctors, 'liste_patients');
  }

}


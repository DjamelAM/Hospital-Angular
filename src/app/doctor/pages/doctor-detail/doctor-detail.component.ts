import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDoctor } from 'src/app/core/models/doctor';
import { DoctorFormData } from 'src/app/core/models/doctor-form-data';
import { IPatient } from 'src/app/core/models/patient';
import { PatientFormData } from 'src/app/core/models/patient-form-data';
import { DoctorService } from 'src/app/core/services/http/doctor.service';
import { ExcelService } from 'src/app/core/services/http/excel.service';
import { PatientService } from 'src/app/core/services/http/patient.service';
import { PatientFormComponent } from 'src/app/patient/components/patient-form/patient-form.component';
import { DoctorFormComponent } from '../../components/doctor-form/doctor-form.component';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss'],
})
export class DoctorDetailComponent implements OnInit {
  doctorId: number;
  doctor: IDoctor;
  doctor$: Observable<IDoctor>;
  patients$: Observable<IPatient[]>;
  patients: IPatient[];

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'birthYear',
    'department',
    'chamber',
    'sexe',
    'doctorId',
    'update',
    'delete',
  ];
  dataSource: MatTableDataSource<IPatient>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _doctorService: DoctorService,
    private _patientService: PatientService,
    private _excelService: ExcelService,
    public dialog: MatDialog,
    private _router: Router
  ) {
    this.doctorId = Number(this._activateRoute.snapshot.paramMap.get('id'));
    this._doctorService
      .getPatientsByDoctor(this.doctorId)
      .subscribe(
        (patients) => (this.dataSource = new MatTableDataSource(patients))
      );
  }

  ngOnInit(): void {
    this.doctorId = Number(this._activateRoute.snapshot.paramMap.get('id'));

    if (this.doctorId) {
      this._doctorService.getDoctor(this.doctorId).subscribe((doctor) => {
        this.doctor = doctor;
      });

      this.patients$ = this._doctorService.getPatientsByDoctor(this.doctorId);
      this._doctorService
        .getPatientsByDoctor(this.doctorId)
        .subscribe((patients) => (this.patients = patients));
    }
  }

  ngAfterViewInit() {
    this._doctorService
      .getPatientsByDoctor(this.doctorId)
      .subscribe((patients) => {
        this.dataSource.data = patients;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(id) {
    this._doctorService.deleteDoctor(id).subscribe((next) => {
      this._router.navigateByUrl('doctors');
    });
  }

  loadData() {
    this._router.navigateByUrl('doctors/');
  }
  goToPatient(id) {
    this._router.navigateByUrl('patients/' + id);
  }

  openDialog(toUpdate: boolean, doctor: IDoctor) {
    const doctorFormData: DoctorFormData = {
      toUpdate: toUpdate,
      doctor: doctor,
    };

    const dialogRef = this.dialog.open(DoctorFormComponent, {
      data: doctorFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deletePatient(id) {
    this._patientService.deletePatient(id).subscribe(() => {
      this.loadDataPatients();
    });
  }

  loadDataPatients() {
    this._doctorService
      .getPatientsByDoctor(this.doctorId)
      .subscribe((patients) => (this.dataSource.data = patients));
  }

  goToDetails(id) {
    this._router.navigateByUrl('patients/' + id);
  }

  openDialogPatient(toUpdate: boolean, patient: IPatient) {
    const patientFormData: PatientFormData = {
      toUpdate: toUpdate,
      patient: patient,
    };

    const dialogRef = this.dialog.open(PatientFormComponent, {
      data: patientFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }
  exportAsXLSX(): void {
    this._patientService
      .getPatients()
      .subscribe((patients) => (this.patients = patients));
    this._excelService.exportAsExcelFile(this.patients, 'liste_patients');
  }
}

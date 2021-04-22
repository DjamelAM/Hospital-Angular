import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPatient } from 'src/app/core/models/patient';
import { PatientFormData } from 'src/app/core/models/patient-form-data';
import { ExcelService } from 'src/app/core/services/http/excel.service';
import { PatientService } from 'src/app/core/services/http/patient.service';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
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
    private _patientService: PatientService,
    private _excelService: ExcelService,
    public dialog: MatDialog,
    private _router: Router,
    private location: Location
  ) {
    this._patientService
      .getPatients()
      .subscribe(
        (patients) => (this.dataSource = new MatTableDataSource(patients))
      );
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this._patientService.getPatients().subscribe((patients) => {
      this.dataSource.data = patients;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  delete(id) {
    this._patientService.deletePatient(id).subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this._patientService.getPatients().subscribe((patients) => {
      this.dataSource.data = patients;
    });
  }

  goToDetails(id) {
    this._router.navigateByUrl('patients/' + id);
  }

  openDialog(toUpdate: boolean, patient: IPatient) {
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

  goBack() {
    this.location.back();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IDoctor } from 'src/app/core/models/doctor';
import { DoctorFormData } from 'src/app/core/models/doctor-form-data';
import { ExcelService } from 'src/app/core/services/http/excel.service';
import { DoctorService } from 'src/app/core/services/http/doctor.service';
import { DoctorFormComponent } from '../../components/doctor-form/doctor-form.component';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
})
export class DoctorsListComponent implements OnInit {
  doctors: IDoctor[];

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'department',
    'update',
    'delete',
  ];
  dataSource: MatTableDataSource<IDoctor>;
  isLoading: Boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _doctorService: DoctorService,
    private _excelService: ExcelService,
    public dialog: MatDialog,
    private _router: Router
  ) {
    this._doctorService.getDoctors().subscribe((doctors) => {
      this.dataSource = new MatTableDataSource(doctors);
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this._doctorService.getDoctors().subscribe((doctors) => {
      this.dataSource.data = doctors;
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
    this._doctorService.deleteDoctor(id).subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this._doctorService.getDoctors().subscribe((doctors) => {
      this.dataSource.data = doctors;
    });
  }

  goToDetails(id) {
    this._router.navigateByUrl('doctors/' + id);
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
  exportAsXLSX(): void {
    this._doctorService
      .getDoctors()
      .subscribe((doctors) => (this.doctors = doctors));
    this._excelService.exportAsExcelFile(this.doctors, 'liste_doctors');
  }
}

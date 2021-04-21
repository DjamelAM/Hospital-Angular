import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IDoctor } from "../../models/doctor";
import { IPatient } from "../../models/patient";

@Injectable()
export class DoctorService {

    endpoint: string = environment.doctorEndpoint;

    constructor(private _httpClient: HttpClient) { }

    getDoctor(id: number) {
        return this._httpClient.get<IDoctor>(this.endpoint + "/" + id);
    }

    getDoctors(): Observable<IDoctor[]> {
        return this._httpClient.get<IDoctor[]>(this.endpoint);
    }

    postDoctor(doctor: IDoctor): Observable<IDoctor[]> {
        return this._httpClient.post<IDoctor[]>(this.endpoint, doctor);
    }

    deleteDoctor(id: number) {
        return this._httpClient.delete(this.endpoint + "/" + id);
    }

    updateDoctor(doctor: IDoctor, id: number): Observable<IDoctor> {
        return this._httpClient.put<IDoctor>(this.endpoint + "/" + id, doctor);
    }

    getPatientsByDoctor(id: number): Observable<IPatient[]> {
        return this._httpClient.get<IPatient[]>(this.endpoint + "/" + id + "/patients");
    }

}
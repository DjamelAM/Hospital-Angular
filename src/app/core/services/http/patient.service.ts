import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IPatient } from "../../models/patient";

@Injectable()
export class PatientService {

    endpoint: string = environment.patientEndpoint;

    constructor(private _httpClient: HttpClient) { }

    getPatient(id: number) {
        return this._httpClient.get<IPatient>(this.endpoint + "/" + id);
    }



    getPatients(): Observable<IPatient[]> {
        return this._httpClient.get<IPatient[]>(this.endpoint);
    }

    postPatient(patient: IPatient): Observable<IPatient[]> {
        return this._httpClient.post<IPatient[]>(this.endpoint, patient);
    }

    deletePatient(id: number) {
        return this._httpClient.delete(this.endpoint + "/" + id);
    }

    updatePatient(patient: IPatient, id: number): Observable<IPatient> {
        return this._httpClient.put<IPatient>(this.endpoint + "/" + id, patient);
    }

}
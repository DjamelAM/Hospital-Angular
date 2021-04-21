import { IPatient } from "./patient";

export interface PatientFormData {
    toUpdate: boolean;
    patient: IPatient;
}
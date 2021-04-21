import { IDoctor } from "./doctor";

export interface DoctorFormData {
    toUpdate: boolean;
    doctor: IDoctor;
}
import { Department } from "../enums/department.enum";

export interface IDoctor {
    id: number;
    firstName: string;
    lastName: string;
    department: Department;
}
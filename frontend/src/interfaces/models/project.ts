import { IUser } from './user';
import {IReport } from './riports'
 
export interface IProjectResponse {
    success: boolean;
    project: IProject;
}

export interface IProject {
    assignedContractorId: string | null;
    contractorId: string | null;
    createdAt: string;
    documents: string | null;
    endDate: string | null;
    location: ILocation;
    phase: string;
    projectDescription: string;
    projectName: string;
    reports: IReport[];
    serviceId: IService;
    startDate: string | null;
    status: string;
    totalBudget: number | null;
    updatedAt: string;
    userId: IUser;
}

export interface ILocation {
    city: string;
    country: string;
    state: string;
    street: string;
    zip: string;
}



export interface IService {
    _id: string;
    name: string;
    category: string;
    description: string;
    duration: string;
}


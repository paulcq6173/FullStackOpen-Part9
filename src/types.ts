export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: TEntry[];
}

interface IBaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface IHealthCheckEntry extends IBaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface IOccupationalHealthcareEntry extends IBaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface IHospitalEntry extends IBaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type TEntry =
  | IHospitalEntry
  | IOccupationalHealthcareEntry
  | IHealthCheckEntry;

// Define omit type for unions
// Refer to https://github.com/microsoft/TypeScript/issues/42680
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type PatientFormValues = UnionOmit<Patient, 'id' | 'entries'>;
export type TRegEntry = UnionOmit<TEntry, 'id'>;

// Redux
export interface INotifyState {
  message: string;
  success?: boolean;
}

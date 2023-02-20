import { Clinic } from './clinic';
export interface Clinics {
  data: {
    active: [Clinic];
    deleted?: [Clinic];
  };
}

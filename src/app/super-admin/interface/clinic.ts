import { Staff } from './staff';
export interface Clinic {
  id: number;
  title: string;
  address: string;
  city: string;
  deleted_at?: null;
  created_at?: string;
  updated_at?: string;
  admin?: string;
  staff?: Staff;
}

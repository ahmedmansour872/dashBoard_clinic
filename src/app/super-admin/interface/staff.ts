import { Roles } from './roles';
export interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  national_id: string;
  accommodation_type?: null;
  accommodation_start?: null;
  accommodation_end?: null;
  clinic_id: 1;
  insurance_company_id?: null;
  insurance_card?: null;
  doctor_percentage?: 0;
  email_verified_at?: null;
  created_at: string;
  updated_at: string;
  roles?: Roles;
}

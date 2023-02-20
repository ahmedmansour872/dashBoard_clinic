import { Items } from './items';
export interface Store {
  data: [
    {
      id: number;
      clinic_id: number;
      title: string;
      items: [Items];
      created_at?: string;
      updated_at?: string;
    }
  ];
}

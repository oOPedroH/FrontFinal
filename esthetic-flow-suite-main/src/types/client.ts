
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthdate?: string;
  address?: string;
  notes?: string;
  beforeAfterImages?: BeforeAfterImage[];
  appointmentHistory?: Appointment[];
}

export interface BeforeAfterImage {
  id: string;
  clientId: string;
  serviceId: string;
  beforeImage: string;
  afterImage: string;
  date: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

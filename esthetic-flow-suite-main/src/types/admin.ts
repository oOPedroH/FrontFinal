
import { ServiceCategory, Service } from "./services";
import { Client, Appointment } from "./client";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  profileImage?: string;
}

export interface ScheduleBlock {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBlocked: boolean;
  reason?: string;
}

export interface AppointmentWithDetails extends Appointment {
  client: Client;
  service: Service;
}

export interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  todayAppointments: number;
  cancelledAppointments: number;
  totalClients: number;
}

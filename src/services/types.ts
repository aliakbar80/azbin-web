export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface User {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email?: string;
  is_staff: boolean;
  is_active: boolean;
  avatar?: string;
  date_joined: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  is_active: boolean;
  category?: string;
  created_at: string;
}

export interface ServiceRequest {
  id: number;
  service: Service;
  user: User;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  description: string;
  created_at: string;
  updated_at: string;
}

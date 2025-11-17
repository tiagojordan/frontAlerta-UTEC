export type IncidentType = 'infraestructura' | 'limpieza' | 'seguridad' | 'otros';
export type IncidentUrgency = 'baja' | 'media' | 'alta';
export type IncidentStatus = 'pendiente' | 'en_atencion' | 'resuelto';
export type UserRole = 'estudiante' | 'administrativo' | 'autoridad';

export interface Incident {
  incidentId: string;
  type: IncidentType;
  location: string;
  description: string;
  urgency: IncidentUrgency;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIncidentDto {
  type: IncidentType;
  location: string;
  description: string;
  urgency: IncidentUrgency;
}

export interface UpdateIncidentDto {
  status: IncidentStatus;
}

export interface User {
  email: string;
  role: UserRole;
}

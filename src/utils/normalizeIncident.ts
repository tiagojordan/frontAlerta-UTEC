import type { Incident } from '../types/incident';

export function normalizeIncident(raw: any): Incident {
  return {
    incidentId: raw.incidentId || raw.id || '',
    type: raw.type || raw.tipo || 'otros',
    location: raw.location || raw.ubicacion || 'desconocida',
    description: raw.description || raw.descripcion || raw.title || '',
    urgency: raw.urgency || raw.urgencia || 'media',
    status: raw.status || raw.estado || 'pendiente',
    createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
    updatedAt: raw.updatedAt || raw.updated_at || raw.createdAt || raw.created_at || new Date().toISOString(),
  };
}

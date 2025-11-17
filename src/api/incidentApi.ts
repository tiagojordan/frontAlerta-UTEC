import type { Incident, CreateIncidentDto } from '../types/incident';
import { normalizeIncident } from '../utils/normalizeIncident';

const BASE_URL = 'https://rqw237u6qg.execute-api.us-east-1.amazonaws.com';

export const incidentApi = {
  async getAll(): Promise<Incident[]> {
    const response = await fetch(`${BASE_URL}/incidentes`);
    if (!response.ok) {
      throw new Error('Error fetching incidents');
    }
    const data = await response.json();
    const items = data.items || [];
    return items.map((item: any) => normalizeIncident(item));
  },

  async create(dto: CreateIncidentDto): Promise<Incident> {
    const response = await fetch(`${BASE_URL}/incidentes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error('Error creating incident');
    }
    const data = await response.json();
    return normalizeIncident(data);
  },

  async updateStatus(id: string, status: string): Promise<Incident> {
    const response = await fetch(`${BASE_URL}/incidentes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Error updating incident');
    }
    const data = await response.json();
    return normalizeIncident(data);
  },
};

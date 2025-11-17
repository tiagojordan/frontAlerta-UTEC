import { Calendar, MapPin, FileText } from 'lucide-react';
import type { Incident } from '../types/incident';
import { UrgencyBadge, StatusBadge } from './IncidentBadge';

interface IncidentCardProps {
  incident: Incident;
  onStatusChange?: (id: string, status: Incident['status']) => void;
  showActions?: boolean;
}

export function IncidentCard({ incident, onStatusChange, showActions }: IncidentCardProps) {
  const typeLabels = {
    infraestructura: 'Infraestructura',
    limpieza: 'Limpieza',
    seguridad: 'Seguridad',
    otros: 'Otros',
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-[#151821] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-[#3b82f6]/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {typeLabels[incident.type]}
          </h3>
          <div className="flex items-center text-sm text-gray-400 gap-1">
            <MapPin className="w-4 h-4" />
            <span>{incident.location}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <UrgencyBadge urgency={incident.urgency} />
          <StatusBadge status={incident.status} />
        </div>
      </div>

      <div className="flex items-start gap-2 mb-4 text-gray-300">
        <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p className="text-sm">{incident.description || 'Sin descripción'}</p>
      </div>

      <div className="flex items-center text-xs text-gray-500 gap-1">
        <Calendar className="w-3 h-3" />
        <span>{formatDate(incident.createdAt)}</span>
      </div>

      {showActions && incident.status !== 'resuelto' && onStatusChange && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
          {incident.status === 'pendiente' && (
            <button
              onClick={() => onStatusChange(incident.incidentId, 'en_atencion')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              Marcar en Atención
            </button>
          )}
          {incident.status === 'en_atencion' && (
            <button
              onClick={() => onStatusChange(incident.incidentId, 'resuelto')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              Marcar Resuelto
            </button>
          )}
        </div>
      )}
    </div>
  );
}

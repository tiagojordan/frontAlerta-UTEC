import type { IncidentUrgency, IncidentStatus } from '../types/incident';

interface UrgencyBadgeProps {
  urgency: IncidentUrgency;
}

export function UrgencyBadge({ urgency }: UrgencyBadgeProps) {
  const colors = {
    baja: 'bg-green-500/20 text-green-400 border-green-500/30',
    media: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    alta: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${colors[urgency]}`}>
      {urgency.toUpperCase()}
    </span>
  );
}

interface StatusBadgeProps {
  status: IncidentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    pendiente: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    en_atencion: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    resuelto: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const labels = {
    pendiente: 'PENDIENTE',
    en_atencion: 'EN ATENCIÓN',
    resuelto: 'RESUELTO',
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

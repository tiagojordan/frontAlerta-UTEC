import { useState, useMemo } from 'react';
import { Filter, Plus, RefreshCw, LogOut } from 'lucide-react';
import { useIncidents } from '../hooks/useIncidents';
import { useAuth } from '../context/AuthContext';
import { IncidentCard } from '../components/IncidentCard';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ReportIncidentModal } from '../components/ReportIncidentModal';
import { incidentApi } from '../api/incidentApi';
import { normalizeIncident } from '../utils/normalizeIncident';
import type { IncidentStatus, IncidentUrgency, Incident } from '../types/incident';
import type { CreateIncidentDto } from '../types/incident';

interface AdminDashboardProps {
  onToast: (message: string, type: 'success' | 'error') => void;
}

export function AdminDashboard({ onToast }: AdminDashboardProps) {
  const { user, logout } = useAuth();
  const { incidents: baseIncidents, loading, refetch } = useIncidents(true);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | 'todos'>('todos');
  const [urgencyFilter, setUrgencyFilter] = useState<IncidentUrgency | 'todas'>('todas');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  useMemo(() => {
    setIncidents(baseIncidents);
  }, [baseIncidents]);

  const handleStatusChange = async (id: string, newStatus: IncidentStatus) => {
    setUpdatingIds((prev) => new Set(prev).add(id));
    try {
      const updatedIncident = await incidentApi.updateStatus(id, newStatus);
      const normalized = normalizeIncident(updatedIncident);

      setIncidents((prev) =>
        prev.map((incident) =>
          incident.incidentId === id ? normalized : incident
        )
      );

      onToast('Incidente actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error updating incident:', error);
      onToast('Error al actualizar el incidente', 'error');
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleReportIncident = async (dto: CreateIncidentDto) => {
    try {
      const newIncident = await incidentApi.create(dto);
      normalizeIncident(newIncident);
      refetch();
      onToast('Incidente reportado exitosamente', 'success');
    } catch (error) {
      console.error('Error reporting incident:', error);
      onToast('Error al reportar el incidente', 'error');
      throw error;
    }
  };

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesStatus = statusFilter === 'todos' || incident.status === statusFilter;
      const matchesUrgency = urgencyFilter === 'todas' || incident.urgency === urgencyFilter;
      return matchesStatus && matchesUrgency;
    });
  }, [incidents, statusFilter, urgencyFilter]);

  const stats = useMemo(() => {
    return {
      total: incidents.length,
      pendiente: incidents.filter((i) => i.status === 'pendiente').length,
      en_atencion: incidents.filter((i) => i.status === 'en_atencion').length,
      resuelto: incidents.filter((i) => i.status === 'resuelto').length,
    };
  }, [incidents]);

  const isAuthority = user?.role === 'autoridad';

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <nav className="bg-[#151821] border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">AlertaUTEC</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <span className={`text-xs px-3 py-1 rounded-lg border font-semibold ${
              isAuthority
                ? 'bg-red-600/20 text-red-400 border-red-600/30'
                : 'bg-purple-600/20 text-purple-400 border-purple-600/30'
            }`}>
              {user?.role === 'autoridad' ? 'AUTORIDAD' : 'ADMINISTRATIVO'}
            </span>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#151821] rounded-xl p-6 border border-gray-800">
            <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Incidentes</div>
          </div>
          <div className="bg-[#151821] rounded-xl p-6 border border-gray-800">
            <div className="text-3xl font-bold text-gray-400 mb-1">{stats.pendiente}</div>
            <div className="text-sm text-gray-400">Pendientes</div>
          </div>
          <div className="bg-[#151821] rounded-xl p-6 border border-gray-800">
            <div className="text-3xl font-bold text-blue-400 mb-1">{stats.en_atencion}</div>
            <div className="text-sm text-gray-400">En Atención</div>
          </div>
          <div className="bg-[#151821] rounded-xl p-6 border border-gray-800">
            <div className="text-3xl font-bold text-green-400 mb-1">{stats.resuelto}</div>
            <div className="text-sm text-gray-400">Resueltos</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-[#151821] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#3b82f6] transition-all"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_atencion">En Atención</option>
              <option value="resuelto">Resuelto</option>
            </select>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value as any)}
              className="bg-[#151821] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#3b82f6] transition-all"
            >
              <option value="todas">Todas las urgencias</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={refetch}
              className="flex items-center gap-2 bg-[#151821] border border-gray-700 hover:border-gray-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Actualizar</span>
            </button>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#3b82f6] to-[#00e5ff] text-white px-4 py-2 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-[#3b82f6]/30"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Reportar Incidente</span>
            </button>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : filteredIncidents.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No se encontraron incidentes
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.incidentId}
                className={updatingIds.has(incident.incidentId) ? 'opacity-60' : ''}
              >
                <IncidentCard
                  incident={incident}
                  onStatusChange={handleStatusChange}
                  showActions={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <ReportIncidentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportIncident}
      />
    </div>
  );
}

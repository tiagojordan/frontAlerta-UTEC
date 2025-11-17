import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ReportIncidentModal } from '../components/ReportIncidentModal';
import { incidentApi } from '../api/incidentApi';
import type { CreateIncidentDto } from '../types/incident';

interface StudentDashboardProps {
  onToast: (message: string, type: 'success' | 'error') => void;
}

export function StudentDashboard({ onToast }: StudentDashboardProps) {
  const { user, logout } = useAuth();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleReportIncident = async (dto: CreateIncidentDto) => {
    try {
      await incidentApi.create(dto);
      onToast('Incidente reportado exitosamente', 'success');
    } catch (error) {
      console.error('Error reporting incident:', error);
      onToast('Error al reportar el incidente', 'error');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <nav className="bg-[#151821] border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">AlertaUTEC</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <span className="text-xs bg-[#3b82f6]/20 text-[#3b82f6] px-3 py-1 rounded-lg border border-[#3b82f6]/30">
              ESTUDIANTE
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

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gradient-to-br from-[#3b82f6]/10 to-[#00e5ff]/10 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-4">Reportar un Incidente</h2>
            <p className="text-gray-400 mb-8">
              Ayúdanos a mantener seguro el campus reportando cualquier incidente que observes. Tu reporte es importante.
            </p>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="bg-gradient-to-r from-[#3b82f6] to-[#00e5ff] text-white font-semibold py-4 px-8 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg shadow-[#3b82f6]/30 text-lg"
            >
              Abrir Formulario de Reporte
            </button>
          </div>

          <div className="bg-[#151821] rounded-2xl p-8 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Tus Reportes</h3>
            <p className="text-gray-400">
              Los incidentes que reportes aparecerán aquí una vez que sean registrados en el sistema.
            </p>
          </div>
        </div>
      </div>

      <ReportIncidentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportIncident}
      />
    </div>
  );
}

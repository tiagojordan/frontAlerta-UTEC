import { useState, FormEvent } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import type { IncidentType, IncidentUrgency, CreateIncidentDto } from '../types/incident';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dto: CreateIncidentDto) => Promise<void>;
}

export function ReportIncidentModal({ isOpen, onClose, onSubmit }: ReportIncidentModalProps) {
  const [type, setType] = useState<IncidentType>('infraestructura');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<IncidentUrgency>('media');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ type, location, description, urgency });
      setType('infraestructura');
      setLocation('');
      setDescription('');
      setUrgency('media');
      onClose();
    } catch (error) {
      console.error('Error submitting incident:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#151821] rounded-2xl max-w-2xl w-full border border-gray-800 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#00e5ff] rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Reportar Incidente</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Incidente
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as IncidentType)}
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
              required
            >
              <option value="infraestructura">Infraestructura</option>
              <option value="limpieza">Limpieza</option>
              <option value="seguridad">Seguridad</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
              placeholder="Ej: Edificio A, Piso 2, Aula 204"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all resize-none"
              placeholder="Describe el incidente con el mayor detalle posible..."
              required
            />
          </div>

          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-300 mb-2">
              Nivel de Urgencia
            </label>
            <select
              id="urgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as IncidentUrgency)}
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
              required
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-[#0f1117] border border-gray-700 hover:border-gray-600 text-white py-3 rounded-lg transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-[#3b82f6] to-[#00e5ff] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none shadow-lg shadow-[#3b82f6]/30"
            >
              {isSubmitting ? 'Enviando...' : 'Reportar Incidente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

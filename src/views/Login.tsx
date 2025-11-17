import { useState, FormEvent } from 'react';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/incident';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('estudiante');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, role);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6] to-[#00e5ff] rounded-2xl flex items-center justify-center shadow-lg shadow-[#3b82f6]/30">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AlertaUTEC</h1>
          <p className="text-gray-400">Sistema de Gestión de Incidentes</p>
        </div>

        <div className="bg-[#151821] rounded-2xl p-8 shadow-xl border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Institucional
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
                placeholder="estudiante@utec.edu.pe"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                Rol
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
              >
                <option value="estudiante">Estudiante</option>
                <option value="administrativo">Administrativo</option>
                <option value="autoridad">Autoridad</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#3b82f6] to-[#00e5ff] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg shadow-[#3b82f6]/30"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useAuth } from '../context/AuthContext';
import { StudentDashboard } from './StudentDashboard';
import { AdminDashboard } from './AdminDashboard';

interface DashboardProps {
  onToast: (message: string, type: 'success' | 'error') => void;
}

export function Dashboard({ onToast }: DashboardProps) {
  const { user } = useAuth();

  if (user?.role === 'estudiante') {
    return <StudentDashboard onToast={onToast} />;
  }

  return <AdminDashboard onToast={onToast} />;
}

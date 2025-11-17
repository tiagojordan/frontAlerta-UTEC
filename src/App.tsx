import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { Toast } from './components/Toast';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Dashboard onToast={showToast} />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

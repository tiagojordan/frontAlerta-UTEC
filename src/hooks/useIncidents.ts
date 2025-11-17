import { useState, useEffect, useCallback } from 'react';
import type { Incident } from '../types/incident';
import { incidentApi } from '../api/incidentApi';

const POLLING_INTERVAL = 12000;

export function useIncidents(enablePolling = true) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    try {
      const incidents = await incidentApi.getAll();
      setIncidents(incidents);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading incidents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidents();

    if (!enablePolling) return;

    const interval = setInterval(() => {
      fetchIncidents();
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchIncidents, enablePolling]);

  return {
    incidents,
    loading,
    error,
    refetch: fetchIncidents,
  };
}

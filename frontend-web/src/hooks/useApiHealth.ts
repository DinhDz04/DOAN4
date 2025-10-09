// frontend-web/src/hooks/useApiHealth.ts
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useApiHealth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await apiService.get('/health');
        setIsConnected(true);
      } catch (error) {
        console.error('Backend connection failed:', error);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return { isConnected, loading };
};
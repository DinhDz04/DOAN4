// frontend-web/src/components/common/ConnectionStatus.tsx
import { useApiHealth } from '../../hooks/useApiHealth';

export const ConnectionStatus = () => {
  const { isConnected, loading } = useApiHealth();

  if (loading) {
    return (
      <div style={{ padding: '10px', background: '#fff3cd', border: '1px solid #ffeaa7' }}>
        🔄 Checking backend connection...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '10px', 
      background: isConnected ? '#d1edff' : '#ffeaea',
      border: `1px solid ${isConnected ? '#b8daff' : '#f5c6cb'}`,
      borderRadius: '4px',
      margin: '10px 0'
    }}>
      {isConnected ? '✅ Connected to backend' : '❌ Backend connection failed'}
    </div>
  );
};
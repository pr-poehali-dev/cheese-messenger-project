import { useState } from 'react';
import AuthScreen from '@/components/AuthScreen';
import MessengerApp from '@/components/MessengerApp';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  } | null>(null);

  const handleAuthSuccess = (email: string) => {
    setCurrentUser({
      id: '1',
      name: 'Пользователь',
      phone: email,
      avatar: '🧀',
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {!isAuthenticated ? (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      ) : (
        <MessengerApp currentUser={currentUser!} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
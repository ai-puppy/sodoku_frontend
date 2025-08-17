import React, { useEffect } from 'react';
import { useAuth } from '../utils/auth';
import { useGame } from '../hooks/useGame';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import GameStats from '../components/Dashboard/GameStats';
import GameCard from '../components/Dashboard/GameCard';
import NewGameSection from '../components/Dashboard/NewGameSection';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { games, nextGame, isLoading, error, fetchGames, fetchNextAvailableGame } = useGame();

  useEffect(() => {
    fetchGames();
    fetchNextAvailableGame();
  }, [fetchGames, fetchNextAvailableGame]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="loading-container">
          <div>Loading dashboard...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.username}!</h1>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
          
          {nextGame?.has_next && (
            <div className="next-game-suggestion">
              <p>You have an unfinished game waiting!</p>
              <a href={`/game/${nextGame.next_game_id}`} className="continue-button">
                Continue Playing
              </a>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            Error loading dashboard: {error}
          </div>
        )}

        <div className="dashboard-content">
          <div className="dashboard-main">
            <NewGameSection />
            
            {games.length > 0 && <GameStats games={games} />}
          </div>

          <div className="dashboard-sidebar">
            <div className="recent-games">
              <h2>Your Games</h2>
              {games.length === 0 ? (
                <p className="no-games">No games yet. Create your first game!</p>
              ) : (
                <div className="games-list">
                  {games
                    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                    .map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
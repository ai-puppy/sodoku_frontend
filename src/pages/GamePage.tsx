import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { useGame } from '../hooks/useGame';
import SudokuBoard from '../components/Game/SudokuBoard';
import ProtectedRoute from '../components/Common/ProtectedRoute';

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { game, isLoading, error, fetchGame, updateGame, clearError } = useGame(gameId ? parseInt(gameId, 10) : undefined);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (!gameId) {
      navigate('/dashboard');
      return;
    }

    const gameIdNum = parseInt(gameId, 10);
    if (isNaN(gameIdNum)) {
      navigate('/dashboard');
      return;
    }

    if (!game) {
      fetchGame(gameIdNum);
    }
  }, [gameId, navigate, game, fetchGame]);

  const handleGameUpdate = async (currentState: number[][]) => {
    if (!game) return;

    const success = await updateGame(game.id, currentState);
    if (success) {
      setLastSaved(new Date());
    }
  };

  const handleGameComplete = () => {
    setTimeout(() => {
      alert('🎉 Congratulations! You completed the puzzle! 🎉');
      navigate('/dashboard');
    }, 500);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="loading-container">
          <div>Loading game...</div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="error-container">
          <h2>Error Loading Game</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/dashboard')} className="auth-button">
            Back to Dashboard
          </button>
        </div>
      </ProtectedRoute>
    );
  }

  if (!game) {
    return (
      <ProtectedRoute>
        <div className="error-container">
          <h2>Game Not Found</h2>
          <p>The requested game could not be found.</p>
          <button onClick={() => navigate('/dashboard')} className="auth-button">
            Back to Dashboard
          </button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="game-page">
        <div className="game-header">
          <h1>Sudoku - {game.difficulty_level.charAt(0).toUpperCase() + game.difficulty_level.slice(1)}</h1>
          <div className="game-info">
            <span>Player: {user?.username}</span>
            {lastSaved && (
              <span className="last-saved">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="back-button"
          >
            ← Back to Dashboard
          </button>
        </div>

        <SudokuBoard
          game={game}
          onGameUpdate={handleGameUpdate}
          onGameComplete={handleGameComplete}
        />

        {error && (
          <div className="error-message">
            {error}
            <button onClick={clearError} className="clear-error">×</button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default GamePage;
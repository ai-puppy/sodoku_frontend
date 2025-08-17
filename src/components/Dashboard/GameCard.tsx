import React from 'react';
import type { Game } from '../../types';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCompletionPercentage = () => {
    const totalCells = 81;
    let filledCells = 0;
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (game.current_state[i][j] !== 0) {
          filledCells++;
        }
      }
    }
    
    return Math.round((filledCells / totalCells) * 100);
  };

  const handlePlayClick = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div className={`game-card ${game.completed ? 'game-card--completed' : ''}`}>
      <div className="game-card__header">
        <h3 className="game-card__difficulty">
          {game.difficulty_level.charAt(0).toUpperCase() + game.difficulty_level.slice(1)}
        </h3>
        {game.completed && <span className="game-card__completed-badge">✓ Completed</span>}
      </div>
      
      <div className="game-card__info">
        <div className="game-card__progress">
          <div className="progress-bar">
            <div 
              className="progress-bar__fill" 
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
          <span className="progress-text">{getCompletionPercentage()}% complete</span>
        </div>
        
        <div className="game-card__dates">
          <div>Started: {formatDate(game.created_at)}</div>
          <div>Last played: {formatDate(game.updated_at)}</div>
          {game.completed_at && (
            <div>Completed: {formatDate(game.completed_at)}</div>
          )}
        </div>
      </div>
      
      <button 
        className="game-card__play-button"
        onClick={handlePlayClick}
        disabled={game.completed}
      >
        {game.completed ? 'View Solution' : 'Continue Playing'}
      </button>
    </div>
  );
};

export default GameCard;
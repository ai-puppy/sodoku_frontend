import React, { useState } from 'react';
import type { DifficultyLevel } from '../../types';
import { useGame } from '../../hooks/useGame';
import { useNavigate } from 'react-router-dom';

const NewGameSection: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('easy');
  const [isCreating, setIsCreating] = useState(false);
  const { createGame, error } = useGame();
  const navigate = useNavigate();

  const difficulties: { level: DifficultyLevel; label: string; description: string }[] = [
    { level: 'easy', label: 'Easy', description: 'Perfect for beginners' },
    { level: 'medium', label: 'Medium', description: 'A moderate challenge' },
    { level: 'hard', label: 'Hard', description: 'For experienced players' },
    { level: 'expert', label: 'Expert', description: 'Ultimate challenge' },
  ];

  const handleCreateGame = async () => {
    setIsCreating(true);
    try {
      const newGame = await createGame(selectedDifficulty);
      if (newGame) {
        navigate(`/game/${newGame.id}`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="new-game-section">
      <h2>Start New Game</h2>
      
      <div className="difficulty-selector">
        <h3>Choose Difficulty</h3>
        <div className="difficulty-options">
          {difficulties.map(({ level, label, description }) => (
            <label key={level} className="difficulty-option">
              <input
                type="radio"
                name="difficulty"
                value={level}
                checked={selectedDifficulty === level}
                onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel)}
              />
              <div className="difficulty-content">
                <span className="difficulty-label">{label}</span>
                <span className="difficulty-description">{description}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <button
        className="create-game-button"
        onClick={handleCreateGame}
        disabled={isCreating}
      >
        {isCreating ? 'Creating Game...' : 'Create New Game'}
      </button>
    </div>
  );
};

export default NewGameSection;
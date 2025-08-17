import React from 'react';
import type { Game } from '../../types';

interface GameStatsProps {
  games: Game[];
}

const GameStats: React.FC<GameStatsProps> = ({ games }) => {
  const totalGames = games.length;
  const completedGames = games.filter(game => game.completed).length;
  const inProgressGames = totalGames - completedGames;
  const completionRate = totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0;

  const difficultyStats = games.reduce((stats, game) => {
    const difficulty = game.difficulty_level;
    if (!stats[difficulty]) {
      stats[difficulty] = { total: 0, completed: 0 };
    }
    stats[difficulty].total++;
    if (game.completed) {
      stats[difficulty].completed++;
    }
    return stats;
  }, {} as Record<string, { total: number; completed: number }>);

  const getAverageCompletionTime = () => {
    const completedWithTime = games.filter(game => 
      game.completed && game.completed_at && game.created_at
    );
    
    if (completedWithTime.length === 0) return 'N/A';
    
    const totalTime = completedWithTime.reduce((sum, game) => {
      const start = new Date(game.created_at).getTime();
      const end = new Date(game.completed_at!).getTime();
      return sum + (end - start);
    }, 0);
    
    const averageMs = totalTime / completedWithTime.length;
    const averageHours = Math.floor(averageMs / (1000 * 60 * 60));
    const averageMinutes = Math.floor((averageMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (averageHours > 0) {
      return `${averageHours}h ${averageMinutes}m`;
    }
    return `${averageMinutes}m`;
  };

  return (
    <div className="game-stats">
      <h2>Your Sudoku Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalGames}</div>
          <div className="stat-label">Total Games</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{completedGames}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{inProgressGames}</div>
          <div className="stat-label">In Progress</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      {Object.keys(difficultyStats).length > 0 && (
        <div className="difficulty-stats">
          <h3>Performance by Difficulty</h3>
          <div className="difficulty-grid">
            {Object.entries(difficultyStats).map(([difficulty, stats]) => (
              <div key={difficulty} className="difficulty-stat">
                <h4>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h4>
                <div className="difficulty-numbers">
                  <span>{stats.completed}/{stats.total} completed</span>
                  <span className="difficulty-percentage">
                    ({stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="additional-stats">
        <div className="additional-stat">
          <span className="stat-label">Average Completion Time:</span>
          <span className="stat-value">{getAverageCompletionTime()}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
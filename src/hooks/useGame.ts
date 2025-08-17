import { useState, useEffect, useCallback } from 'react';
import type { Game, GameCreate, GameUpdate, NextGameResponse, DifficultyLevel } from '../types';
import apiService from '../services/api';

export const useGame = (gameId?: number) => {
  const [game, setGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [nextGame, setNextGame] = useState<NextGameResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchGame = async (id: number) => {
    setIsLoading(true);
    setError('');
    try {
      const gameData = await apiService.getGame(id);
      setGame(gameData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch game');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const gamesData = await apiService.getGames();
      setGames(gamesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch games');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createGame = async (difficulty: DifficultyLevel): Promise<Game | null> => {
    setIsLoading(true);
    setError('');
    try {
      const gameCreate: GameCreate = { difficulty_level: difficulty };
      const newGame = await apiService.createGame(gameCreate);
      setGame(newGame);
      return newGame;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateGame = async (gameId: number, currentState: number[][]): Promise<boolean> => {
    setError('');
    try {
      const gameUpdate: GameUpdate = { current_state: currentState };
      const updatedGame = await apiService.updateGame(gameId, gameUpdate);
      setGame(updatedGame);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update game');
      return false;
    }
  };

  const fetchNextAvailableGame = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const nextGameData = await apiService.getNextAvailableGame();
      setNextGame(nextGameData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch next game');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId);
    }
  }, [gameId]);

  return {
    game,
    games,
    nextGame,
    isLoading,
    error,
    fetchGame,
    fetchGames,
    createGame,
    updateGame,
    fetchNextAvailableGame,
    clearError: () => setError('')
  };
};
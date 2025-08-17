export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Game {
  id: number;
  puzzle_data: number[][];
  current_state: number[][];
  difficulty_level: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface GameCreate {
  difficulty_level: string;
}

export interface GameUpdate {
  current_state: number[][];
}

export interface NextGameResponse {
  has_next: boolean;
  next_game_id?: number;
  suggested_difficulty: string;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface ApiError {
  detail: string;
}
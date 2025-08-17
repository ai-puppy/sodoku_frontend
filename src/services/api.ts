import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { 
  User, 
  AuthResponse, 
  UserLogin, 
  UserCreate, 
  Game, 
  GameCreate, 
  GameUpdate, 
  NextGameResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: UserLogin): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.client.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: UserCreate): Promise<User> {
    const response: AxiosResponse<User> = await this.client.post('/auth/register', userData);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.client.get('/auth/me');
    return response.data;
  }

  // Game endpoints
  async getGames(): Promise<Game[]> {
    const response: AxiosResponse<Game[]> = await this.client.get('/games/');
    return response.data;
  }

  async createGame(gameData: GameCreate): Promise<Game> {
    const response: AxiosResponse<Game> = await this.client.post('/games/new', gameData);
    return response.data;
  }

  async getGame(gameId: number): Promise<Game> {
    const response: AxiosResponse<Game> = await this.client.get(`/games/${gameId}`);
    return response.data;
  }

  async updateGame(gameId: number, gameUpdate: GameUpdate): Promise<Game> {
    const response: AxiosResponse<Game> = await this.client.put(`/games/${gameId}`, gameUpdate);
    return response.data;
  }

  async getNextAvailableGame(): Promise<NextGameResponse> {
    const response: AxiosResponse<NextGameResponse> = await this.client.get('/games/next-available');
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    const response: AxiosResponse<{ status: string }> = await this.client.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
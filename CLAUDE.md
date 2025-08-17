# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server (Vite) on http://localhost:5173
- `npm run build` - Build the project for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally
- `npm install` - Install dependencies

## Project Architecture

This is a React 18 + TypeScript Sudoku frontend application built with Vite. The app connects to a backend API running on http://localhost:8000.

### Key Architecture Patterns

**Authentication Flow**:
- JWT token-based authentication with localStorage persistence
- AuthContext provides authentication state throughout the app
- Protected routes automatically redirect unauthenticated users
- API service automatically includes Bearer tokens and handles 401 responses

**State Management**:
- React Context for global auth state (`contexts/AuthContext.tsx`)
- Custom hooks for feature-specific state (`hooks/useGame.ts`, `hooks/useAuth.tsx`)
- Local component state for UI interactions

**API Integration**:
- Centralized API service class (`services/api.ts`) with axios
- Automatic token injection via request interceptors
- Automatic logout on 401 responses via response interceptors
- TypeScript interfaces for all API data structures (`types/index.ts`)

**Component Structure**:
- Feature-based organization under `components/` (Auth, Game, Dashboard, Common)
- Page components in `pages/` directory
- Reusable UI components in `components/Common/`

### Game Logic

**Sudoku Board**:
- 9x9 grid represented as `number[][]` (0 = empty cell)
- Interactive cells with click and keyboard input support
- Real-time validation and visual feedback
- Auto-save functionality with 2-second debouncing (`hooks/useDebounce.ts`)

**Game State**:
- `puzzle_data`: Original puzzle (immutable)
- `current_state`: User's current progress
- Completion detection and automatic progression

### Important Files

- `src/types/index.ts` - TypeScript interfaces for all data structures
- `src/services/api.ts` - API service with authentication and error handling
- `src/hooks/useGame.ts` - Game state management and API interactions
- `src/contexts/AuthContext.tsx` - Global authentication state
- `src/utils/sudokuValidation.ts` - Game validation logic
- `src/App.tsx` - Route configuration and app structure

### Development Notes

- Backend API must be running on http://localhost:8000 for full functionality
- Uses React Hook Form for form validation
- ESLint configured with TypeScript and React hooks rules
- Husky configured for git hooks (see `package.json` prepare script)
- No test framework currently configured

backend code path: /Users/hw/Desktop/sodoku_backend
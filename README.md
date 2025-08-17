# Sudoku React Frontend

A modern React TypeScript frontend for the Sudoku game application, featuring user authentication, interactive gameplay, and progress tracking.

## Features

- **User Authentication**: Register and login with JWT token management
- **Interactive Sudoku Board**: 9x9 grid with click/keyboard input support
- **Auto-save**: Automatic game state persistence every 2 seconds
- **Progress Tracking**: View game statistics and completion rates
- **Multiple Difficulty Levels**: Easy, Medium, Hard, and Expert
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Validation**: Immediate feedback for invalid moves

## Technology Stack

- React 18 with TypeScript
- Vite for fast development and building
- React Router for navigation
- Axios for API communication
- React Hook Form for form validation
- Custom hooks for state management

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Sudoku backend API running on http://localhost:8000

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sudoku-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication forms
│   ├── Common/          # Shared components
│   ├── Dashboard/       # Dashboard components
│   └── Game/            # Sudoku game components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API service layer
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── App.tsx              # Main application component
```

## Key Components

### Authentication
- Login and registration forms with validation
- Protected routes for authenticated users
- JWT token management with automatic refresh

### Game Features
- Interactive 9x9 Sudoku grid
- Number input via click or keyboard
- Real-time move validation
- Auto-save functionality with debouncing
- Game completion detection

### Dashboard
- User statistics and progress tracking
- Game history with completion status
- New game creation with difficulty selection
- Continue unfinished games

## API Integration

The frontend communicates with the backend API for:
- User authentication (`/auth/login`, `/auth/register`)
- Game management (`/games/`, `/games/new`, `/games/{id}`)
- Progress tracking and statistics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

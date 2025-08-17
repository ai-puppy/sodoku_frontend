import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import SudokuCell from './SudokuCell';
import NumberInput from './NumberInput';
import type { Game } from '../../types';
import { getInvalidCells, isBoardComplete, deepCopyBoard } from '../../utils/sudokuValidation';
import { useDebounce } from '../../hooks/useDebounce';

interface SudokuBoardProps {
  game: Game;
  onGameUpdate: (currentState: number[][]) => void;
  onGameComplete: () => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ game, onGameUpdate, onGameComplete }) => {
  const [currentBoard, setCurrentBoard] = useState<number[][]>(game.current_state);
  const [originalBoard] = useState<number[][]>(game.puzzle_data);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastGameId, setLastGameId] = useState<number>(game.id);
  
  const invalidCells = useMemo(() => getInvalidCells(currentBoard), [currentBoard]);
  
  const initialBoardRef = useRef<number[][]>(game.current_state);
  const debouncedBoard = useDebounce(currentBoard, 500);

  useEffect(() => {
    // Only update the board if we switched to a different game
    // Don't reset when API response comes back from our own save
    if (game.id !== lastGameId) {
      setCurrentBoard(game.current_state);
      initialBoardRef.current = game.current_state;
      setHasUnsavedChanges(false);
      setLastGameId(game.id);
    }
  }, [game.current_state, game.id, lastGameId]);


  useEffect(() => {
    if (hasUnsavedChanges && debouncedBoard !== initialBoardRef.current) {
      onGameUpdate(debouncedBoard);
      setHasUnsavedChanges(false);
    }
  }, [debouncedBoard, hasUnsavedChanges, onGameUpdate]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (originalBoard[row][col] !== 0) return;
    setSelectedCell({ row, col });
  }, [originalBoard]);

  const handleNumberSelect = useCallback((number: number) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    if (originalBoard[row][col] !== 0) return;

    const newBoard = deepCopyBoard(currentBoard);
    newBoard[row][col] = number;
    
    setCurrentBoard(newBoard);
    setHasUnsavedChanges(true);

    if (isBoardComplete(newBoard)) {
      onGameUpdate(newBoard);
      onGameComplete();
    }
  }, [selectedCell, originalBoard, currentBoard, onGameUpdate, onGameComplete]);

  const handleClear = useCallback(() => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    if (originalBoard[row][col] !== 0) return;

    const newBoard = deepCopyBoard(currentBoard);
    newBoard[row][col] = 0;
    
    setCurrentBoard(newBoard);
    setHasUnsavedChanges(true);
  }, [selectedCell, originalBoard, currentBoard]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!selectedCell) return;

    const key = event.key;
    if (key >= '1' && key <= '9') {
      handleNumberSelect(parseInt(key, 10));
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      handleClear();
    } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
      event.preventDefault();
      const { row, col } = selectedCell;
      let newRow = row;
      let newCol = col;

      switch (key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          break;
        case 'ArrowDown':
          newRow = Math.min(8, row + 1);
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          break;
        case 'ArrowRight':
          newCol = Math.min(8, col + 1);
          break;
      }

      setSelectedCell({ row: newRow, col: newCol });
    }
  }, [selectedCell, handleNumberSelect, handleClear]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="sudoku-game">
      <div className="sudoku-board">
        {currentBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              isOriginal={originalBoard[rowIndex][colIndex] !== 0}
              isSelected={
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              }
              isInvalid={invalidCells.has(`${rowIndex}-${colIndex}`)}
              row={rowIndex}
              col={colIndex}
              onCellClick={handleCellClick}
            />
          ))
        )}
      </div>
      
      <NumberInput onNumberSelect={handleNumberSelect} onClear={handleClear} />
      
      {game.completed && (
        <div className="game-complete-message">
          🎉 Congratulations! Puzzle completed!
        </div>
      )}
    </div>
  );
};

export default SudokuBoard;
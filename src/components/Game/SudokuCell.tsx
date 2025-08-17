import React from 'react';

interface SudokuCellProps {
  value: number;
  isOriginal: boolean;
  isSelected: boolean;
  isInvalid: boolean;
  row: number;
  col: number;
  onCellClick: (row: number, col: number) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  isOriginal,
  isSelected,
  isInvalid,
  row,
  col,
  onCellClick,
}) => {
  const handleClick = () => {
    if (!isOriginal) {
      onCellClick(row, col);
    }
  };

  const cellClasses = [
    'sudoku-cell',
    isOriginal ? 'sudoku-cell--original' : 'sudoku-cell--editable',
    isSelected ? 'sudoku-cell--selected' : '',
    isInvalid ? 'sudoku-cell--invalid' : '',
    col === 2 || col === 5 ? 'sudoku-cell--right-border' : '',
    row === 2 || row === 5 ? 'sudoku-cell--bottom-border' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cellClasses}
      onClick={handleClick}
      role="button"
      tabIndex={isOriginal ? -1 : 0}
      aria-label={`Cell ${row + 1}-${col + 1}, ${value === 0 ? 'empty' : `value ${value}`}`}
    >
      {value === 0 ? '' : value}
    </div>
  );
};

export default SudokuCell;
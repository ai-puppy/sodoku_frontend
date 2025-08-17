export const isValidMove = (
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean => {
  if (num === 0) return true;

  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) return false;
    if (i !== row && board[i][col] === num) return false;
  }

  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartCol = Math.floor(col / 3) * 3;

  for (let i = boxStartRow; i < boxStartRow + 3; i++) {
    for (let j = boxStartCol; j < boxStartCol + 3; j++) {
      if ((i !== row || j !== col) && board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
};

export const getInvalidCells = (board: number[][]): Set<string> => {
  const invalidCells = new Set<string>();

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = board[row][col];
      if (value !== 0 && !isValidMove(board, row, col, value)) {
        invalidCells.add(`${row}-${col}`);
      }
    }
  }

  return invalidCells;
};

export const isBoardComplete = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return false;
      }
    }
  }
  
  return getInvalidCells(board).size === 0;
};

export const deepCopyBoard = (board: number[][]): number[][] => {
  return board.map(row => [...row]);
};
import React, { useCallback, useRef } from 'react';

interface NumberInputProps {
  onNumberSelect: (number: number) => void;
  onClear: () => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ onNumberSelect, onClear }) => {
  const lastClickTimeRef = useRef<number>(0);
  
  const handleNumberClick = useCallback((number: number) => {
    const now = Date.now();
    // Prevent clicks within 100ms of each other
    if (now - lastClickTimeRef.current < 100) {
      return;
    }
    lastClickTimeRef.current = now;
    onNumberSelect(number);
  }, [onNumberSelect]);

  const handleClearClick = useCallback(() => {
    const now = Date.now();
    // Prevent clicks within 100ms of each other
    if (now - lastClickTimeRef.current < 100) {
      return;
    }
    lastClickTimeRef.current = now;
    onClear();
  }, [onClear]);

  return (
    <div className="number-input">
      <div className="number-input__numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            className="number-input__button"
            onClick={() => handleNumberClick(number)}
            aria-label={`Enter number ${number}`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        className="number-input__clear"
        onClick={handleClearClick}
        aria-label="Clear cell"
      >
        Clear
      </button>
    </div>
  );
};

export default NumberInput;
import React from 'react';

interface NumberInputProps {
  onNumberSelect: (number: number) => void;
  onClear: () => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ onNumberSelect, onClear }) => {
  return (
    <div className="number-input">
      <div className="number-input__numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            className="number-input__button"
            onClick={() => onNumberSelect(number)}
            aria-label={`Enter number ${number}`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        className="number-input__clear"
        onClick={onClear}
        aria-label="Clear cell"
      >
        Clear
      </button>
    </div>
  );
};

export default NumberInput;
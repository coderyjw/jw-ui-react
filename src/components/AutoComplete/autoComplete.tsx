import Input, { InputProps } from '../Input/input';
import { ChangeEvent, useState } from 'react';
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, value, onSelect, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const result = fetchSuggestions(value);
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };
  const handleSelect = (value: string) => {
    setSuggestions([]);
    setInputValue(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="jw-auto-complete">
      <Input value={inputValue} {...restProps} onChange={handleChange} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;

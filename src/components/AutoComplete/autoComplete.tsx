import Input, { InputProps } from '../Input/input';
import { ChangeEvent, useState, ReactElement, useEffect, KeyboardEvent, useRef } from 'react';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void;
  /** 文本框发生改变的时候触发的事件*/
  onChange?: (value: string) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'vikingship'
 * ~~~
 */
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, value, onSelect, renderOption, style, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceValue = useDebounce(inputValue);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([]);
      const result = fetchSuggestions(debounceValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((res) => {
          setLoading(false);
          setSuggestions(res || []);
          if (res.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(result);
        if (result.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debounceValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 'ArrowDown':
        highlight(highlightIndex + 1);
        break;
      case 'ArrowUp':
        highlight(highlightIndex - 1);
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="jw-suggestion-list">
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex,
            });
            return (
              <li className={cnames} key={index} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="jw-auto-complete" ref={componentRef} style={style}>
      <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown} />
      {loading && (
        <div className="suggstions-loading-icon">
          <Icon icon="spinner" spin />
        </div>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button, {ButtonType, ButtonSize} from './components/Button/button';

function App() {
  return (
    <div className="App">
      <Button>Hello</Button>
      <Button btnType={ButtonType.Primary}>Hello</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large}>Hello</Button>
      <Button btnType={ButtonType.Link} href="https://www.baidu.com">Hello</Button>
    </div>
  );
}

export default App;

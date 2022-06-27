import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button, {ButtonType, ButtonSize} from './components/Button/button';

function App() {
  return (
    <div className="App">
      <Button> Hello </Button>
      <Button disabled> Disabled Button </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Primary </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Danger </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com"> Baidu Link </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Disabled Link </Button>
    </div>
  );
}

export default App;

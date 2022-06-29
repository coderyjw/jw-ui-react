import React from 'react';
import './App.css';
import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Alert, { type } from './components/Alert/alert'

function App() {
  return (
    <div className="App">
      <div>
        <Button autoFocus> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Primary </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Danger </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com"> Baidu Link </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Disabled Link </Button>
      </div>
      <div>
        <Alert title="this is a alert" type={type.Default}/>
        <Alert title="this is a alert" type={type.Warning}/>
        <Alert title="this is a alert" type={type.Success}/>
        <Alert title="this is a alert" type={type.Danger}/>
      </div>
    </div>
  );
}

export default App;

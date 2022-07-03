import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <Menu style={{marginBottom: '200px',marginLeft: '10px'}} defaultIndex={1} onSelect={index => console.log(index)} mode="vertical">
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
          <MenuItem>dropdown3</MenuItem>
        </SubMenu>
        <MenuItem>4</MenuItem>
        <MenuItem>5</MenuItem>
      </Menu>
      <div style={{marginBottom: '10px'}}>
        <Button autoFocus> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Primary </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Danger </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com"> Baidu Link </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Disabled Link </Button>
      </div>
      <div style={{width: "500px"}}>
        <Alert title="this is a alert" type={AlertType.Default}/>
        <Alert title="this is a alert" type={AlertType.Warning}/>
        <Alert title="this is a alert" type={AlertType.Success}/>
        <Alert title="this is a alert" type={AlertType.Danger}/>
        <Alert title="this is a alert" description="this is a description" type={AlertType.Danger}/>
      </div>
    </div>
  );
}

export default App;

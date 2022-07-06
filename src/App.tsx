import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem';
import Icon from './components/Icon/icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
function App() {
  return (
    <div className="App">
      <Menu 
        style={{marginBottom: '200px',marginLeft: '10px'}} 
        defaultIndex="0"
        onSelect={index => console.log(index)}
        defaultOpenSubMenus={['0','1','2']}
        mode="vertical"
      >
        <SubMenu title="dropdown" >
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

      <Tabs >
        <TabItem label='one' disabled>this is card one</TabItem>
        <TabItem label='two'>this is card two</TabItem>
        <TabItem label='three'>this is card three</TabItem>
      </Tabs>

      <FontAwesomeIcon icon={faCoffee} />
      <Icon icon="arrow-down" theme="danger" size="10x"/>
    </div>
  );
}

export default App;

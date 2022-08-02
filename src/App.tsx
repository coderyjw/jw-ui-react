import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import Input from './components/Input/input';
import AutoComplete, { DataSourceType } from './components/AutoComplete/autoComplete';
import Icon from './components/Icon/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Transition from './components/Transition/transition';
import { useState } from 'react';
library.add(fas);
function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showTabs, setShowTabs] = useState(false);

  interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
  }
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    );
  };
  return (
    <div className="App">
      <Button onClick={(e) => setShowMenu(!showMenu)}>showMenu</Button>
      <Button onClick={(e) => setShowBtn(!showBtn)}>showButton</Button>
      <Button onClick={(e) => setShowAlert(!showAlert)}>showAlert</Button>
      <Button onClick={(e) => setShowTabs(!showTabs)}>showTabs</Button>
      <Transition in={showMenu} timeout={300} animation="zoom-in-top">
        <Menu
          style={{ marginBottom: '200px', marginLeft: '10px' }}
          defaultIndex="0"
          defaultOpenSubMenus={['0', '1', '2']}
          mode="horizontal"
        >
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
          </SubMenu>
          <MenuItem>4</MenuItem>
          <MenuItem>5</MenuItem>
        </Menu>
      </Transition>
      <Transition in={showBtn} wrapper timeout={300} animation="zoom-in-top">
        <div style={{ marginBottom: '10px' }}>
          <Button autoFocus> Hello </Button>
          <Button disabled> Disabled Button </Button>
          <Button btnType="primary" size="lg">
            {' '}
            Large Primary{' '}
          </Button>
          <Button btnType="danger" size="sm">
            {' '}
            Small Danger{' '}
          </Button>
          <Button btnType="link" href="http://www.baidu.com">
            {' '}
            Baidu Link{' '}
          </Button>
          <Button btnType="link" href="http://www.baidu.com" disabled>
            {' '}
            Disabled Link{' '}
          </Button>
        </div>
      </Transition>

      <Transition in={showAlert} timeout={300} animation="zoom-in-top">
        <div style={{ width: '500px' }}>
          <Alert title="this is a alert" type="default" />
          <Alert title="this is a alert" type="warning" />
          <Alert title="this is a alert" type="success" />
          <Alert title="this is a alert" type="danger" />
          <Alert title="this is a alert" description="this is a description" type="danger" />
        </div>
      </Transition>
      <Transition in={showTabs} timeout={300} animation="zoom-in-top">
        <Tabs defaultIndex={1}>
          <TabItem label="one" disabled>
            this is card one
          </TabItem>
          <TabItem label="two">this is card two</TabItem>
          <TabItem label="three">this is card three</TabItem>
        </Tabs>
      </Transition>
      <Input style={{ width: '350px' }} onChange={(e) => console.log(e.target.value)} />
      <AutoComplete
        style={{ width: '350px' }}
        fetchSuggestions={handleFetch}
        placeholder="输入 Github 用户名试试"
        renderOption={renderOption}
      />
    </div>
  );
}

export default App;

import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  SkinOutlined, CoffeeOutlined, FireOutlined, PropertySafetyFilled,
} from '@ant-design/icons';
import {
  Button,
  PageHeader,
  Menu,
} from 'antd';
import applets from 'components/applets/appletRegistry';
import { IApplet, IScreen } from 'components/applets/IApplet';

const { SubMenu } = Menu;

const generateSubmenuKeys = (): string[] => {
  const result:string[] = [];
  applets.forEach((applet) => {
    applet.screens.forEach((screen: IScreen) => {
      result.push(`${applet.handle}/${screen.handle}`);
    });
  });
  return result;
};

const generateSubMenuItems = (applet: IApplet): JSX.Element[] => {
  const result:JSX.Element[] = [];
  applet.screens.forEach((screen: IScreen) => {
    result.push(<Menu.Item key={`${applet.handle}/${screen.handle}`}>{screen.title}</Menu.Item>);
  });
  return result;
};

const generateMenuItems = () => {
  const result:JSX.Element[] = [];
  applets.forEach((applet) => {
    if (applet.screens.length === 1) {
      result.push(<Menu.Item key={applet.handle}>{applet.screens[0].title}</Menu.Item>);
    } else {
      const submenu = generateSubMenuItems(applet);
      result.push(<SubMenu key={applet.handle} icon={applet.icon} title={applet.title}>{submenu}</SubMenu>);
    }
  });
  return result;
};

// const rootSubmenuKeys = generateSubmenuKeys();
// const menuItems = generateMenuItems();

type Props = RouteComponentProps<null> & {
  history: History
};

type State = {
  openKeys: string[],
  rootSubmenuKeys: string[],
  menuItems: JSX.Element[]
};

class Sidebar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      openKeys: [],
      rootSubmenuKeys: generateSubmenuKeys(),
      menuItems: generateMenuItems(),
    };
  }

  onOpenChange = (keys: string[]): void => {
    const { openKeys, rootSubmenuKeys } = this.state;
    const latestOpenKey: string | undefined = keys.find((key: string) => openKeys.indexOf(key) === -1);
    if (!latestOpenKey || rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: keys,
      });
    } else {
      this.setState({
        openKeys: (latestOpenKey ? [latestOpenKey] : []),
      });
    }
  };

  onClick = (e: any) => {
    const { history } = this.props;
    if (e.key === 'dashboard') history.push('/dashboard');
    else history.push(`/${e.key}`);
  };

  render() {
    const { openKeys, menuItems } = this.state;
    return (
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.onClick}
      >
        {menuItems}
      </Menu>
    );
  }
}

export default withRouter(Sidebar);

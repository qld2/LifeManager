import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';
import {
  Button,
  PageHeader,
  Menu,
} from 'antd';
import applets from 'components/applets/appletRegistry';
import { IApplet, IScreen } from 'components/applets/IApplet';
import { AppState, AppDispatch } from 'src/Root';

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

const mapStateToProps = (state: AppState) => ({
  user: state.oidc.user,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
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
    const { dispatch } = this.props;
    if (e.key === 'dashboard') dispatch(push('/dashboard'));
    else dispatch(push(`/${e.key}`));
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

export default connector(Sidebar);

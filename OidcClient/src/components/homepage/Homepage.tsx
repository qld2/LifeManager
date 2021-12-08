import React from 'react';
import { History } from 'history';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import {
  Button,
  PageHeader,
  Menu,
  Divider,
} from 'antd';
import {
  UserOutlined,
  UnlockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Homepage.css';

import userManager from 'util/userManager';
import Login from './Login';

type PathParamsType = {
  placeholder: string,
};

type Props = RouteComponentProps<PathParamsType> & {
  history: History
};

class Homepage extends React.Component<Props> {
  componentDidMount() {
    userManager.signinRedirect();
  }

  render() {
    return (
      <div className="Homepage">
        {/* <div className="Homepage-Card">
          <PageHeader
            className="Homepage-PageHeader"
            backIcon={false}
            title="Welcome,"
          />

          <div className="Homepage-Section">
            <div className="Homepage-Standard">
              <Button
                className="Homepage-Button"
                type="primary"
                shape="round"
                size="large"
                onClick={this.login}
              >
                Login
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
export default withRouter(Homepage);

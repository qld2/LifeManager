import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Button,
  Input,
} from 'antd';
import {
  UserOutlined,
  UnlockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from '@ant-design/icons';

import './Login.css';
import { submitLogin, LoginDTO } from 'fetch/homepage';
import Function from 'util/Function';

type Props = {
};

type State = {
  username: string,
  password: string
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit = () => {};

  render() {
    return (
      <div className="Login">
        <div className="Login-InputContainer">
          <h3 className="Login-Title">Username:</h3>
          <Input
            size="large"
            className="Login-Input"
            placeholder="Username"
            onChange={(e) => { this.setState({ username: e.target.value }); }}
            prefix={<UserOutlined />}
          />
          <h3 className="Login-Title">Password:</h3>
          <Input.Password
            size="large"
            className="Login-Input"
            placeholder="Password"
            onChange={(e) => { this.setState({ password: e.target.value }); }}
            onPressEnter={this.onSubmit}
            prefix={<UnlockOutlined />}
          />

          <div className="Login-InputContainerBottom">
            <Button className="Login-Submit" onClick={this.onSubmit} type="primary" size="large">
              Log In
            </Button>
            <a className="Login-ForgotPassword" href="www.google.com">Forgot your password?</a>
          </div>
        </div>

        <div className="Login-ExternalProviders">
          <Button className="Login-Button" type="primary" shape="round" icon={<GoogleOutlined />} size="large" />
          <div className="Login-Space" />
          <Button className="Login-Button" type="primary" shape="round" icon={<FacebookOutlined />} size="large" />
          <div className="Login-Space" />
          <Button className="Login-Button" type="primary" shape="round" icon={<TwitterOutlined />} size="large" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(Login);

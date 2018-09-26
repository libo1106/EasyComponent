import React, { Component } from "react";
import _ from "lodash";

import { Input, Form } from "../packages/validator";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    const { state } = this;

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>

        <div>
          <Form id="form" onSubmit={evt => alert("提交成功")}>
            <Input
              placeholder="请输入邮箱"
              type="text"
              value={state.email}
              validate={Input.isEmail}
              onChange={evt => this.setState({ email: evt.target.value })}
              customValidity="请输入正确的邮箱地址"
            />

            <Input
              placeholder="请输入密码，至少8位"
              type="password"
              value={state.password}
              onChange={evt => this.setState({ password: evt.target.value })}
              validate={value => Boolean(value.length > 8)}
              customValidity="密码至少8位"
            />
          </Form>
        </div>

        <div>
          <button type="submit" form="form">
            提交
          </button>
        </div>
      </div>
    );
  }
}

export default App;

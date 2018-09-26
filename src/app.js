import React, { Component } from "react";
import _ from "lodash";

import { Input, Form } from "../packages/validator";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
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
              placeholder="请输入个数"
              value={state.value}
              onChange={evt => this.setState({ value: evt.target.value })}
              validate={value => {
                let number = Number(value);
                return _.isInteger(number) && number > 0;
              }}
              customValidity="只能输入正整数"
            />

            <Input value={state.name} />
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

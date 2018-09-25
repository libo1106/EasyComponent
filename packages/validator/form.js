import React, { Component } from "react";

class Form extends Component {
  static checkValidity(formElement) {
    let length = formElement.elements.length;
    let i = 0;

    for (i; i < length; i++) {
      let element = formElement.elements[i];

      // 如果不用校验，退出
      if (!element.validate) {
        break;
      }

      // 如果校验成功。退出
      if (element.validate()) {
        break;
      }

      // 有任何一个校验失败，则立即返回 false
      return false;
    }

    // 如果都校验成功，则返回 true
    return true;
  }

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();

    const { props } = this;

    let formElement = evt.target;

    if (!Form.checkValidity(formElement)) {
      return;
    }

    if (!props.onSubmit) {
      return;
    }

    props.onSubmit(evt);
  }

  render() {
    const { props, state } = this;

    let { onSubmit, children, ...attrs } = props;

    return (
      <form {...attrs} onSubmit={this.submit}>
        {children}
      </form>
    );
  }
}

export { Form };

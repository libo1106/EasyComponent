import React, { Component } from "react";

class Form extends Component {
  /**
   * @name 检查整个表单区域内容是否合法
   * @description
   * HTMLFormElement.prototype.checkValidity() 方法
   * 依赖每个元素必须有执行过 setCustomValidity，
   * 否则会导致未输入的元素不被检查
   * 如果使用 required attr，在 React 下面会一直处于 invalid 状态
   * 故采用自行实现一个 checkValidity 的方案
   * */
  static checkValidity(formElement) {

    let length = formElement.elements.length;
    let i = 0;

    // HTMLFormElement.prototype.elements 对象没有 forEach，只能用 for 处理
    for (i; i < length; i++) {
      let element = formElement.elements[i];

      // 如果元素被禁止，退出
      if (element.disabled) {
        continue;
      }

      // 如果不用校验，退出
      if (!element.validate) {
        continue;
      }

      // 如果校验成功。退出
      if (element.validate()) {
        continue;
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

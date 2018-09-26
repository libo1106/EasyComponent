import React, { Component, createRef } from "react";
import propTypes from "prop-types";

class Input extends Component {
  static isIPv6(value) {
    return /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(
      value
    );
  }
  static isIPv4(value) {
    return /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(
      value
    );
  }

  static isEmail(value) {
    return /\S+@\S+/.test(value);
  }

  constructor(props) {
    super(props);

    this.el = createRef();

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.bindNativeValidate();
  }

  bindNativeValidate() {
    const { props } = this;

    const inputElement = this.el.current;

    if (!inputElement) {
      return;
    }

    if (!props.validate) {
      return;
    }

    // 给原生 input 元素补上 validate 方法，供 HTMLFormElements.prototypes.elements 的时候使用
    inputElement.validate = () => {
      let res = props.validate(inputElement.value);

      if (res) {
        inputElement.setCustomValidity("");
      } else {
        inputElement.setCustomValidity(props.customValidity || "输入内容有误");
      }

      return res;
    };
  }

  update(evt) {
    const { props } = this;

    // JSX 事件类型 首字母大写
    let type = evt.type.replace(/^\S/, s => s.toUpperCase());

    let originEventHandler = props[`on${type}`];

    if (!originEventHandler) {
      originEventHandler = () => {
        console.debug(`未绑定 on${type}`);
      };
    }

    // 没有绑定校验，直接交给绑定的事件
    if (!props.validate) {
      return originEventHandler(evt);
    }

    // 执行校验
    let res = props.validate(evt.target.value);

    // 更新校验结果
    if (res) {
      this.el.current.setCustomValidity("");
    } else {
      this.el.current.setCustomValidity(props.customValidity || "输入内容有误");
    }

    // 交给源事件进行处理
    return originEventHandler(evt);
  }

  render() {
    const { props } = this;

    let { validate, customValidity, onBlur, onChange, ...attrs } = props;

    return (
      <input
        {...attrs}
        onBlur={this.update}
        onChange={this.update}
        ref={this.el}
      />
    );
  }
}

Input.propTypes = {
  customValidity: propTypes.string,
  validate: propTypes.func
};

export { Input };

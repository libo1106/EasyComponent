import React from 'react';

const Button = (props) => {

    let {children, onClick, form, ...attrs} = props;

    return (
        <button onClick={evt => handlerClick(evt, form, onClick)} {...attrs}>{children}</button>
    )

}

const handlerClick = function (evt, formAttr, originClickHandler = () => console.log('未绑定 onClick 事件')) {

    // 没有使用 form attrs 的，保留原来的行为
    if (!formAttr) return originClickHandler(evt);

    // 如果不是 submit ，保留原来的行为
    if (evt.target.type !== 'submit') return originClickHandler(evt);

    // 寻找目标 form
    let formEle = document.getElementById(formAttr);

    // 找不到目标 form ，保留原来的行为
    if (!formEle) return originClickHandler(evt);

    // 阻止掉默认的 type=submit 的 button 的 click 事件，避免触发后续的 submit
    // submit 在随后模拟一个
    evt.preventDefault();

    // 这里要模拟一次 submit 事件，且推入异步队列中，在 click  之后触发
    // 直接用 formEle.submit() 会导致 onSubmit 没有被触发
    setTimeout(() => {
        dispatchSubmitEvent(formEle)
    }, 100)

    // 恢复原来的 click
    originClickHandler(evt)
}

const dispatchSubmitEvent = function (element) {
    let event;

    try {
        event = new Event('submit', {
            bubbles: true,
            cancelable: true
        })
    } catch (err) {
        event = document.createEvent('Event')
        event.initEvent('submit', true, true)
    }

    element.dispatchEvent(event)

}

export {Button}
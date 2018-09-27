import React from 'react';

const Button = (props) => {

    let {children, onClick, form, ...attrs} = props;

    return (
        <button onClick={evt => handlerClick(evt, form, onClick)} {...attrs}>{children}</button>
    )

}

const handlerClick = function (evt, formAttr, originClickHandler) {

    // 没有使用 form attrs 的，保留原来机制
    if (!formAttr) return originClickHandler(evt);

    evt.preventDefault();

    let formEle = document.getElementById(formAttr);

    if (!formEle) return

    // 这里要模拟一次 submit 事件，且推入异步队列中，在 click  之后触发
    // 直接用 formEle.submit() 会导致 onSubmit 没有被触发
    setTimeout(() => {
        dispatchSubmitEvent(formEle)
    }, 100)

    // 恢复原来的 click
    originClickHandler && originClickHandler(evt)
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
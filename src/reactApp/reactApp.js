import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component.js';

const reactLifecycles = singleSpaReact({
    React, 
    ReactDOM, 
    rootComponent: Root,
    domElementGetter,
})
export function bootstrap(props){
    return reactLifecycles.bootstrap(props);
}

export function mount(props){
    return reactLifecycles.mount(props);
}

export function unmount(props){
    return reactLifecycles.unmount(props);
}

function domElementGetter() {
    let element = document.getElementById('app1');
    if (!element){
        element = document.createElement('div');
        element.id = 'app1'
        document.body.appendChild(element);
    }

    return element
}
import {declareChildApplication, start} from 'single-spa';

declareChildApplication("cool-app", loadCoolApp, isCoolAppActive);

start();

// This is a loading function
const loadCoolApp = () => {
    return import("./cool-app/cool.app.js");
}

const isCoolAppActive = () => {
    return window.location.hash.startsWith()
}
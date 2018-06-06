import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('../navBar/navBar.app.js'), () => true);
registerApplication('reactApp', () => import ('../reactApp/reactApp.app.js'), pathPrefix('/reactApp'));
registerApplication('angular1', () => import('../angular1/angular1.app.js'), pathPrefix('/angular1'));
registerApplication('home', () => import('../home/home.app.js'), () => location.pathname === "" || location.pathname === "/");

start();

function pathPrefix(prefix) {
    return function(location) {
        console.log(location)
        return location.pathname.startsWith(`${prefix}`);
    }
}

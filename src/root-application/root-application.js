import {registerApplication, start} from 'single-spa';

registerApplication('navBar', () => import ('../navBar/navBar.js'), () => true);
registerApplication('reactApp', () => import ('../reactApp/reactApp.js'), pathPrefix('/reactApp'));


start();

// This is a loading function
function pathPrefix(prefix) {
    return function(location) {
        console.log(location)
        return location.pathname.startsWith(`${prefix}`);
    }
}

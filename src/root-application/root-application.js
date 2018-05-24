import * as singleSpa from 'single-spa';

singleSpa.registerApplication('app-1', () => 
    import ('../reactApp/reactApp.js'), pathPrefix('/reactApp'));

singleSpa.start();

// This is a loading function
function pathPrefix(prefix) {
    return function(location) {
        console.log(location)
        return location.pathname.startsWith(`${prefix}`);
    }
}

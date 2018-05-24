import * as singleSpa from 'single-spa';

singleSpa.registerApplication('app-1', () => 
    import ('../reactApp/reactApp.js'), pathPrefix('/reactApp')
);

singleSpa.start();

// This is a loading function
const pathPrefix = (prefix) => {
    return (location) => {
        return location.pathname.startsWith(`${prefix}`);
    }
}

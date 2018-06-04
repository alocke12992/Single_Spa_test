# single-spa Quick start tutorial
single-spa allows you to build micro frontends that coexist and can each be written with their own framework. This will allow you and your team to: 

1) Use multiple frameworks on the same page. [(see the single-spa ecosystem for more info)](https://single-spa.js.org/docs/ecosystem.html#docsNav)
2) Write code using a new framework, without rewriting your existing application
3) [Lazy load](https://en.wikipedia.org/wiki/Lazy_loading) code for improved initial load time

For this tutorial, we will be focused on creating a one code repo, one build single-spa application from scratch using React and Angular1(AngularJS) with Webpack. It is important to note that you do not need to use webpack to use single-spa. It is simply an option that ...........? You can find the completed project here. Read more about [seperating applications](https://single-spa.js.org/docs/separating-applications.html) using single-spa. 

Be sure to read through the [singe-spa docs](https://single-spa.js.org/), check out the other tutorials and the [single-spa github](https://github.com/CanopyTax/single-spa).

## Step 1) Project Set up 
### a) Make folders - show file tree 

Create a new directory to house our project. 

```bash
mkdir single-spa-simple-example && cd single-spa-simple example
```

In the root of our new project, initialize the package manager of your choice then install single-spa. For this tutorial, we will be using [yarn](https://yarnpkg.com/en/). 

```bash
yarn init
yarn add single-spa
```

### b) install dependencies  

#### SHOULD I INCLUDE ALL DEPENDENCIES UP FRONT OR AS NEEDED IN THE TUTORIAL?
devDependencies: 
babel-core
babel-loader
babel-plugin-syntax-dynamic-import
babel-preset-env
babel-preset-latest
babel-preset-react
clean-webpack-plugin
css-loader
html-loader
style-loader
webpack
webpack-cli
webpack-dev-server

dependencies: 
angular
angular-ui-router
single-spa
single-spa-angular1
single-spa-react
webpack-dev-server

### c) set up webpack.config and babel
  #### SHOULD I BE EXPLAINING THE USE CASE FOR CleanWebpackPlugin and ContextReplacementPlugin??


## Step 2) Create the master html file
  a) create a div for each single-spa application 
  b) include scripts and stylesheets
    styles:

    ```html
    <!-- Materialize CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    ```

    scripts:

    ```html
    <!-- Jquery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <!-- Materialize CSS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
    <!-- Access to the root applicaiton -->
    <script src="/dist/root-application.js"></script>
    ```

## Step 3) Registering our first application 
  [Register your applications](https://single-spa.js.org/docs/configuration.html#registering-applications) with single-spa. This enables single-spa to know how and when to initiate, load, mount and unmount an application. Registration most commonly occurs inside of the single spa config. This will allow hierarchy to be maintained between the applications.

  From the root directory, create a new folder called `root-application` then create your `single-spa-config.js` file. 
  ```bash
  # from the root directory
  mkdir root-application
  touch root-application/single-spa-config.js
  ```
  Now that we have our single-spa-config.js file, we can begin to register applications. In order to register an application with single-spa we call the `registerApplication()` api and include the application `name`, a `loadingFunction` and an `activityFunction`. 

  In `single-spa-config.js`, start by importing the `registerApplication` and `start` functions. 

  ```js
  // single-spa-config.js
  import {registerApplication, start} from 'single-spa';
```

  The start() api must be called by your single spa config in order for applications to actually be mounted. Before start is called, applications will be loaded, but not bootstrapped/mounted/unmounted. Learn more about the [start()](https://single-spa.js.org/docs/configuration.html#calling-singlespastart) api here.

With our functions imported, we can now register an application with single-spa and call `start()`. Lets start by creating a 'home' application.

```js
// single-spa-config.js
import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home', 
  // Our loading function 
  loadingFunction, 
  // Our activity function
  activityFunction
  );

  start()
```
The third argument to registerApplication, `activityFunction`, must be a pure function. The function is provided window.location as the first argument, and returns a truthy value whenever the application should be active. Most commonly, the activity function determines if an application is active by looking at window.location/the first param.
Since `home` will be our root component, we can set the `activityFunction` to be our root path.

```js
// single-spa-config.js
import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home', 
  // Our loading function 
  loadingFunction, 
  // Our activity function
  () => location.pathname === "" || location.pathname === "/")
  );

  start()
```
## Step 4) Create the home application

### a) Folder setup
We will be using React to create the home component. Using your package manager, add `react`, `react-dom`, and the sinlge-spa-react helper [single-spa-react](https://single-spa.js.org/docs/ecosystem.html).

```bash
yarn add react react-dom single-spa-react
```

Before we can start building our home component, we have to create a `src` folder to house all of our applications. It is within this folder that we will create an individual folder for each application. Each application will have an application file to control the bootstrap, mount and unmount functions and a `root` component. Read more about the [registered application lifecycle](https://single-spa.js.org/docs/building-applications.html#registered-application-lifecycle). 

Start by adding a `src` folder to contain our `home` folder. Then inside of `home` we will create two files: `home.app.js` and `root.component.js`. 

```bash
mkdir src && cd src
mkdir home
touch home/home.app.js home/root.component.js
``` 

Your file tree should look like this: 
  |--single-spa-simple-example
      |--node_modules
      |--src
          |--root-application
              |--single-spa-config.js
          |--home
              |--home.app.js
              |--root.component.js
    |--babelrc
    |--index.html
    |--package.json
    |--webpack.config.js
    |--yarn-error.log
    |--yarn.lock

### b) Application lifecycles

Since we have registered our applicaiton, single-spa will be listening for the `home` app to bootstrap and mount. We will set this up in `home.app.js`. 
We start by importing our dependencies and, using [single-spa-react](https://github.com/CanopyTax/single-spa-react), we can use the generic react lifecycle hooks. Finally, we will use the `domElementGetter()` function to return a DOM Element where the react application will be bootstrapped, mounted, and unmounted.


```js
// home.app.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Home from './root.component.js';



const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Home,
  domElementGetter,
})
```
With our imports estaplished, we can create the required lifecycle functions: 

```js
// home.app.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Home from './root.component.js';



const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Home,
  domElementGetter,
})

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];

// Finally, we specify the location we want single-spa to mount our application 
function domElementGetter() {
  return document.getElementById("home")
}
```

### c) Build the React app
Now that we have our application registered, and hooked up to single-spa with lifecycle methods, we can build our React app. 
Open home/root.component.js and add the following: 

```js
import React from 'react'

class Home extends React.Component{
  render(){
    return(
      <div style={{ marginTop: '100px' }}>
        <h1>Home Component</h1>
      </div>
    )
  }
}
export default Home
```


### d) Connect to the root application
Head back to the root-application folder and in single-spa-config.js we need to add a [loading function](https://single-spa.js.org/docs/configuration.html#loading-function) for our new home app.
With [webpack 2+](https://webpack.js.org/), we can take advantage of its support for [code splitting](https://webpack.js.org/guides/code-splitting/) with [import()](https://webpack.js.org/api/module-methods/#import) in order to easily lazy-load registered applications when they are needed.

```js
// single-spa-config.js
import {registerApplication, start} from 'single-spa'

registerApplication(
  // Name of our single-spa application
  'home', 
  // Our loading function 
  () => import('../home/home.app.js'),
  // Our activity function
  () => location.pathname === "" || location.pathname === "/")
);

start()
```  

The last step in getting our home application ready is simply to add a `<div>` to our html file contining our app's unique id. 
In the root directory, access the `index.html` file and add the following:

```html
<body>
  <div id="home"></div>
</body> 
```


## Angular: 
  Webpack cannot read HTML files. To get our webpack working with Angular, we will need a plugin that will allow Webpack to read the html file. 
  

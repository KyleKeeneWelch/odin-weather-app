# odin-weather-app

This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `Async/Await', 'Promises' and 'API calls using fetch()' to develop a Weather application with asynchronous data handling and customizable responses from the Weather API.

The project aims to provide a simple Weather-based dashboard service with the relevant Weather information provided based on an entered location. It offers a summary, some statistics and a forecast that can be altered to show daily and hourly forecast information. **Note - Weather API free tier returns forecast data for up to three days and so the application caters for this.**

The application logic is split into two modules `Weather` for calls to the Weather API and storage of the users current configuration and `Display` which contains the DOM methods for accessing and updating information. We use classes, getter and setter methods as well as imports/exports to enforce closure and provide effective modular code which is easier to debug and update.

Data that is obtained through `fetch()` is accessed by several `update` methods which look into certain areas of the `json` object and pick out key information to be displayed to the user. Preferences such as which temperature display should be shown is handled by getting and setting a `tempDisplay` value in the Weather module and is used by the ternary operator to assign values based on whether celsius is currently assigned. Each time the user clicks to switch these values, we access a local copy of the data instead of making an unneeded call to the API for the same information and change which key values we access in the `json` object.

The page is generated with `HTML Webpack Plugin` and the modules are passed as entry points that produce a single script to be injected into the page. The application is optimized and the size reduced using the `devtool` option provided by webpack and this is set to `eval`. The application also uses `babel` to transpile its code into a format that can be easily used by older browsers and browser versions while still maintaining the modern syntax.

## Features

- **Modular** - Makes use of JavaScript ES6 import syntax to import methods belonging to classes of application data structures. Modules are standalone and can be tested by themselves before integrated with the rest of the application.

- **JavaScript Validation API** - Location Search Input and Form are handled through the JavaScript Validation API and produce coherrant error messages when the user provides invalid input.

- **Date-fns Integration** - The application imports the `format()` function part of the Date-fns package which is used to pass through Date text collected from the `json` object and output in a specified format.

- **Webpack Optimization** - Utilizies Webpack devtool to optimize performance and reduce application size. HTML Webpack Plugin is used to generate the page with the required script and stylesheet injected.

- **Babel Transpilation** - Converts modern syntax into a format that can be used by older browsers and browser versions so the application can be used by more users who prefer older mediums.

- **Async/Await** - Uses `Promise-Like` syntax in `Async` functions to await values from asynchronous callbacks and to return a thenable promise. `Try/Catch` block is used as if the function were synchronous to track and handle errors.

- **Background Fade Upon Condition Change** - Utilizes `setInterval()` and a decrement to the `opacity` property to "fade" the background into the image which represents the Weather condition that the currently searched location contains.

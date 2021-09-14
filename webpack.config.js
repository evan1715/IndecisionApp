/*  Video 50: Installing & Configuring Webpack
    - Webpack is recommended to be installed as a dev dependency. Special cases may make it a regular dependency.
    - Webpack will utilize Babel by itself. Since it will automatically run Babel, we do not need to include it in the argument in the package.json.
    - This file, webpack.config.js, is actually a Node script. So, we have access to everything we would have access to inside of a Nodejs application.
    - This file must be stored in the root of the project for it to work (or at least the root of the clientside/React);
    - In order to get webpack working, there's two pieces of information that are critical.
    -- First is the entry which is where does our application start. For this, it'll be in src/app.js.
    -- Second is to tell it where to output the bundle file.
    - On module.exports = {} is where we'll set up everything for our webpack build.
    -- module.exports is a Nodejs command that exposes what's inside to other files.
    - https://webpack.js.org/concepts/ 
    - We tell it entry: './src/app.js' to tell it where the application is to start.
    - output has to be set to an object. Two things must be provided, the path and the filename. The common name for the filename is bundle.js.
    - To have the output path work, we're going to load in the Nodejs module 'path' and use it in output.
    
    !!!!**** - What does mode: 'production', 'development', or 'none' really mean?
    https://webpack.js.org/configuration/mode/ 
    ^^What do these really mean?

    Video 54: Setting up Babel with Webpack
    - A loader lets us customize the behavior of webpack when it loads a given file. To set up a loader, we set up module: {}
    -- The 'rule' property let's us set up an array of rules. A rule lets us define how you want to use your loaders.
    -- We'll add in loader: 'babel-loader'
    -- The 'test' property will set what types of files we want to run this loader on.
    --- It'll be a regular expression where we target files that end with .js. It's saying that only files that meet this criteria will we run babel through them.
    -- The 'exclude' will exclude a given set of files. In this case, we're excluding the entire node_modules folder. 
    - To set up webpack so that it runs babel's react and env presets, we must create a separate file in the root folder called .babelrc.
    -- This is a JSON file that allows us to take all of the arguments we passed into the babel-cli command line and put them in the file.

    Video 56: Source Maps with Webpack
    - If there's an error in the build, it will be hard to locate since the build file is compiled and is different from the source code we wrote.
    - The solution to this is to use Source Maps with Webpack's devtools.
    -- https://webpack.js.org/configuration/devtool/ 
    - We're going to use cheap-module-eval-source-map
    ---** this has been changed to eval-cheap-module-source-map
    - It'll show us what line we had the error on within the actual code rather than the build.

    Video 57: Webpack Dev Server
    - npm i webpack-dev-server --save-dev
    - https://webpack.js.org/configuration/dev-server/ 
    - Here, we add the property devServer: {}, which is an object. Inside of it, we can put many arguments.
    -- For this case, we'll put in contentBase to tell the webpack devServer where the folder is located.
    -- contentBase: path.join(__dirname, 'public');
    - To make this run, we can create a script in package.json and use the value "webpack serve"
*/
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        // port: 3000,
        open: true,
        liveReload: true
    },
    //I've added this 'mode' section to get rid of warning message from Webpack. Not from videos:
    mode: 'development'
}
// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = (env) => {
    // Configuration in common to both client-side and server-side bundles
    const extractTheme = new ExtractTextPlugin('themes/[name].css');
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: ['.js', '.ts'] },
        output: {
            filename: '[name].js',
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
              //  { test: /\.ts$/, include: /ClientApp/, use: isDevBuild ? ['awesome-typescript-loader?silent=true', 'angular2-template-loader', 'angular2-router-loader'] : ['@ngtools/webpack', 'angular-router-loader?aot=true'] },
                { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, use: isDevBuild ? ['awesome-typescript-loader?silent=true', 'angular2-template-loader', 'angular2-router-loader'] : ['@ngtools/webpack'] },
                { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/, use: 'url-loader?limit=25000' },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                { test: /\.css$/, use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize'] },
                {
                    test: /\.scss$/,
                    use: extractTheme.extract({ use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize', 'sass-loader'] }),
                    include: [path.join(__dirname, 'ClientApp/app/assets/themes')]
                },
                {
                    test: /\.scss$/,
                    use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize', 'sass-loader'],
                    exclude: [path.join(__dirname, 'ClientApp/app/assets/themes')]
                }
            ]
        },
        plugins: [extractTheme, new CheckerPlugin()]
    };

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        entry: {    
            'main-client': './ClientApp/boot.browser.ts',
            'deeppurple-amber': './ClientApp/app/assets/themes/deeppurple-amber.scss',
            'indigo-pink': './ClientApp/app/assets/themes/indigo-pink.scss',
            'pink-bluegrey': './ClientApp/app/assets/themes/pink-bluegrey.scss',
            'purple-green': './ClientApp/app/assets/themes/purple-green.scss',
            'polyfills': './ClientApp/polyfills.ts'
        },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
          
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin(),
                new AngularCompilerPlugin({
                    tsConfigPath: './tsconfig.json',
                    entryModule: path.join(__dirname, 'ClientApp/app/app.module#AppModule')
                })
            ])
    });

    return [clientBundleConfig];
};

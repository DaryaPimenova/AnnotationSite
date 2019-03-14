var path = require('path');
var webpack = require('webpack');
var colors = require('colors/safe');
var glob = require("glob");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

require('es6-promise')
    .polyfill();

entries = [];
entiesCount = 1;

function fillEntries(entry) {
    entry = "./" + entry;
    console.log(colors.green("    " + entiesCount + ": " + entry));
    entries.push(entry);
    entiesCount += 1;
}

rmDir = function (dirPath) {
    try {
        var files = fs.readdirSync(dirPath);
    } catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
};

console.log(colors.yellow('Find entries'));
glob.sync("*/static/**/app.jsx", {
    cwd: path.resolve(__dirname)
})
    .forEach(fillEntries);
glob.sync("*/static/**/app.js", {
    cwd: path.resolve(__dirname)
})
    .forEach(fillEntries);

var PROD = JSON.parse(process.env.NODE_ENV || '0');

var plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': PROD === "1" ? '"production"' : '"development"'
        }
    }),
    new webpack.ProvidePlugin({
        '_': 'lodash',
        'moment': 'moment',
        '$': 'jquery',
        'jQuery': 'jquery',
        'swal': 'sweetalert2'
    }),
    function () {
        this.plugin('watch-run', function (watching, callback) {
            console.log(colors.yellow('Begin compile at ' + new Date()));
            callback();
        })
    },
    new ExtractTextPlugin({
        filename: (getPath) => {
            return getPath('styles.css')
        },
        allChunks: true
    }),
];

var watch = PROD !== 1;

console.log(colors.yellow('Run building'));

targets = [];

console.log(watch);
console.log(entries);
entries.forEach(function (entry) {
    var context = path.resolve(path.dirname(entry));
    var buildFolder = path.join(context, 'build');

    rmDir(buildFolder);

    var targetPlugins = plugins;

    targets.push({
        cache: true,
        context: path.resolve(path.dirname(entry)),
        entry: './app.js',
        optimization: {
            minimize: !watch,
        },
        mode: PROD === 1 ? "production" : "development",
        output: {
            path: buildFolder,
            filename: "app.build.js",
        },
        plugins: targetPlugins,
        devtool: "cheap-module-source-map",
        module: {
            rules: [{
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader?cacheDirectory=true",
                    options: {
                        presets: ["@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    },
                },
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }
                ])
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract('css-loader')
            }, {
                test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|ttf|otf)(\?\S*)?$/,
                use: {loader: "file-loader?mimetype=image/svg+xml"}
            }]
        },
        watch: watch,
        resolve: {
            modules: ['node_modules', path.resolve(path.dirname(entry))],
            extensions: [
                '.jsx',
                '.js',
            ],
            unsafeCache: true,
        }
    })
});

module.exports = targets;

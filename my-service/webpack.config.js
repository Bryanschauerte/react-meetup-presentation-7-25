var path = require('path');
var nodeExternals = require('webpack-node-externals');
var glob = require("glob");

module.exports = {
    entry: globEntries("./src/*.js"),
    target: 'node',

    externals: [nodeExternals()],

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: __dirname,
            exclude: /node_modules/
        }]
    },
    output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'// this should match the first part of function handler in `serverless.yml`
  }
};

function globEntries(globPath) {
    var files = glob.sync(globPath);
    var entries = {};

    for (var i = 0; i < files.length; i++) {
        var entry = files[i];
        entries[path.basename(entry, path.extname(entry))] = './' + entry;
    }

    return entries;
}

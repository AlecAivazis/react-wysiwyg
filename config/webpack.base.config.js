/*
 * Base build configuration common to both live and development builds.
 *   references:
 *     * http://webpack.github.io/docs/
 *     * https://github.com/petehunt/webpack-howto
 */

/* local imports */
var project_paths = require('./project_paths')

// export the configuration
module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?stage=0',
                include: [project_paths.source_dir, project_paths.example_dir],
            },
        ],
    },
    output: {
        path: project_paths.build_dir
    },
    resolve: {
        extensions: ['', '.js'],
        root: [project_paths.root, project_paths.source_dir]
    },
    eslint: {
        configFile: project_paths.eslint_config,
        failOnError: true,
    },
}


// end of file

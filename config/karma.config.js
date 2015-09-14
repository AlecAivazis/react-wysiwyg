/*
 * Karma configuration.
 *   references:
 *     http://karma-runner.github.io/0.13/config/configuration-file.html
 */

/* local imports */
var project_paths = require('./project_paths')
var webpack_dev_config = require(project_paths.webpack_dev_config)


module.exports = function(config) {
    // annoying hack to be able to dynamically set keys on object
    var preprocessors = {}
    preprocessors[project_paths.unit_tests_glob] = ['webpack']

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: project_paths.root_dir,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'mocha',
            'chai',
        ],

        // list of files / patterns to load in the browser
        files: [
            project_paths.unit_tests_glob,
        ],

        // // list of files to exclude
        // exclude: [
        // ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: preprocessors,

        // configure webpack using settings from development webpack config
        webpack: {
            module: {
                loaders: webpack_dev_config.module.loaders
            },
            resolve: webpack_dev_config.resolve
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DISABLE,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome',
            'Firefox',
            'Safari',
        ],

        // // Continuous Integration mode
        // // if true, Karma captures browsers, runs the tests and exits
        // singleRun: false,

        // activate necessary plugins
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
        ],
    })
}


// end of file

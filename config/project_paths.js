/*
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

/* node imports */
var path = require('path')


// project root directory
var rute = path.join(__dirname, '..')
// configuration directory
var config_dir = path.join(rute, 'config')
var source_dir = path.join(rute, 'src')
var example_dir = path.join(rute, 'example')
var test_dir = path.join(rute, 'tests')


// export the project paths|globs object
module.exports = {
    root: rute,
    source_dir: source_dir,
    build_dir: path.join(rute, 'build'),
    unit_tests_glob: path.join(test_dir, '*', 'test_*.js'),
    karma_config: path.join(config_dir, 'karma.config.js'),
    webpack_base_config: path.join(config_dir, 'webpack.base.config.js'),
    webpack_dev_config: path.join(config_dir, 'webpack.dev.config.js'),
    webpack_prod_config: path.join(config_dir, 'webpack.prod.config.js'),
    eslint_config: path.join(config_dir, 'eslintrc'),
    babel_config: path.join(config_dir, 'babel.config.js'),
    entry: path.join(source_dir, 'index.js'),
    example_dir: example_dir,
    example_entry: path.join(example_dir, 'example.js')
}


// end of file

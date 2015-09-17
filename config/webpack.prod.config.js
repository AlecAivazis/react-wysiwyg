/*
 * Build configuration for live builds.
 */

/* common webpack imports */
var webpack = require('webpack')
/* misc third party imports */
var assign = require('lodash/object/assign')
/* local imports */
var project_paths = require('./project_paths')


// export an configuration extending the base configuration
module.exports = assign({}, require(project_paths.webpack_base_config), {
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
    ],
})


// end of file

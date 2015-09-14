/*
 * Build configuration for development builds.
 */

/* misc third party imports */
var assign = require('lodash/object/assign')
/* local imports */
var project_paths = require('./project_paths')


// export an configuration extending the base configuration
module.exports = assign({}, require(project_paths.webpack_base_config), {
    devtool: 'source-map',
})


// end of file

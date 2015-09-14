/**
 * Defines common tasks used in development.
 */

/* common gulp imports */
var gulp = require('gulp')
var del = require('del')
var webpack = require('webpack-stream')
var named = require('vinyl-named')
var karma = require('karma').server
var flow = require('gulp-flowtype')
/* misc third party imports */
var assign = require('lodash/object/assign')
var path = require('path')
/* local imports */
var project_paths = require('./config/project_paths')


/**
 * Remove all ouptut files from previous builds.
 */
gulp.task('clean', function() {
    return del(project_paths.build_dir)
})


/**
 * Build entry points with webpack (for development).
 */
gulp.task('build', ['clean'], function() {
    return gulp.src(project_paths.entry)
        .pipe(named())
        .pipe(webpack(require(project_paths.webpack_dev_config)))
        .pipe(gulp.dest(project_paths.build_dir))
})


/**
 * Watch source for changes, (development) build on change.
 */
gulp.task('watch', ['clean'], function() {
    gulp.src(project_paths.entry)
        .pipe(named())
        .pipe(webpack(assign(
            {},
            require(project_paths.webpack_dev_config),
            {watch: true}
        )))
        .pipe(gulp.dest(project_paths.build_dir))
})


/**
 * Build frontend entry points for production.
 */
gulp.task('build-prod', ['clean'], function() {
    return gulp.src(project_paths.entry)
        .pipe(named())
        .pipe(webpack(require(project_paths.webpack_live_config)))
        .pipe(gulp.dest(project_paths.build_dir))
})


/**
 * Run the test suite once.
 */
gulp.task('test', function(cb) {
    karma.start({
        configFile: project_paths.karma_config,
        singleRun: true
    }, function() {
        // annoying hack to allow async task without throwing error to gulp
        cb()
    })
})


/**
 * Watch source and tests for changes, run tests on change.
 */
gulp.task('tdd', function() {
    karma.start({
        configFile: project_paths.karma_config
    })
})


// end of file

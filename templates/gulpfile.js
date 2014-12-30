var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webpack = require('webpack'),
  browserSync = require('browser-sync'),
  webpackConfig = require('./webpack.config'),
  watch = require('gulp-watch'),
  runSequence = require('run-sequence'),
  del = require('del');

/** Clean Task **/
gulp.task('clean', function(cb) {
  del('dist', cb);
});

/** Production Build Task **/
gulp.task('build', ['webpack:build']);
gulp.task('webpack:build', ['clean'], function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(new webpack.DefinePlugin({
    "process.env": {
      // This has effect on the react lib size
      "NODE_ENV": JSON.stringify("production")
    }
  }), new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin());
  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

/** Development Build Task **/
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;
myDevConfig.cache = false;
// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);
gulp.task('dev', ['webpack:build-dev']);
gulp.task('webpack:build-dev', function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

/* Live Development Server */
gulp.task('browser-sync', ['dev'], function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});
gulp.task('serve', ['browser-sync'], function() {
  watch(['index.html', 'index.js', 'index.css', 'src/**/*'], function() {
    runSequence('dev', browserSync.reload);
  });
});


gulp.task('default', ['serve']);
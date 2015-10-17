'use strict';
var path = require('path');

var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var less = require('gulp-less');


var opts = {
    entries: ['./src/js/index.jsx'],
    debug: true
};

function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}

var b = browserify(opts);
b.transform(reactify);

gulp.task('browserify', function () {
    b.bundle().pipe(source('index.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('index', function () {
        gulp.src('src/html/**/*.html')
            .pipe(gulp.dest('dist'))
            .pipe(connect.reload());
});

gulp.task('less', function () {
    return gulp.src(['src/less/index.less'])
        .pipe(less({
            paths: [ path.join(__dirname, 'src/less'), path.join(__dirname, 'node_modules') ]
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('assets', function () {
    gulp.src(['node_modules/font-awesome/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('connect', function () {
   connect.server({
       host: '0.0.0.0',
       root: 'dist',
       livereload: true
   });
});

gulp.task('watch', function () {
    gulp.watch(['./src/html/**/*.html'], ['index']);
    gulp.watch(['./src/js/**/*'], ['browserify']);
    gulp.watch(['./src/less/*.less'], ['less']);
});

gulp.task('build', ['index', 'less', 'assets', 'browserify']);
gulp.task('default', ['build', 'watch', 'connect']);

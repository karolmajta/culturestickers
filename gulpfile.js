'use strict';

var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var sass = require('gulp-sass');


var opts = {
    entries: ['./src/js/index.jsx'],
    debug: true
};

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
    gulp.watch(['./src/sass/*.sass'], ['sass']);
});

gulp.task('build', ['index', 'browserify']);
gulp.task('default', ['build', 'watch', 'connect']);
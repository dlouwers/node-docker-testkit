"use strict"
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tsd = require('gulp-tsd');
var concat = require('gulp-concat');
var merge = require('merge2');
var del = require('del');

var paths = {
    target: ['target'],
    output: 'target/js',
    definitions: 'target/js/main',
    typescript: ['src/ts/**/*.ts', 'target/typings/**/*.d.ts'],
    tests: ['target/js/it/**/*Test.js', 'target/js/test/**/*Test.js']
};

var tsProject = ts.createProject('tsconfig.json');

var tsdOptions = {
    command: 'reinstall',
    config: 'tsd.json'
};

gulp.task('clean', function() {
  return del(paths.target);
});

gulp.task('tsd', function (callback) {
    tsd(tsdOptions, callback);
});

gulp.task('typescript', function() {
    var tsResult = gulp.src(paths.typescript)
      .pipe(sourcemaps.init())
      .pipe(ts(tsProject));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts.pipe(concat('index.d.ts')).pipe(gulp.dest(paths.definitions)),
        tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(paths.output))
    ]);
});

gulp.task('default', function () {
    return gulp.src(paths.tests, {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({
          reporter: 'nyan',
          require: ['source-map-support/register']
        }));
});

gulp.task('watch', ['typescript'], function() {
    gulp.watch(paths.typescript, ['typescript']);
});

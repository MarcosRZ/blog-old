/* eslint-disable */

const gulp = require('gulp');
const run = require('gulp-run');
const del = require('del');
const runSequence = require('run-sequence');

const transpile = ['index.js', 'config/*.js', 'graphql/**', 'db/**', 'middleware/**'];
const copy = ['package.json'];

// Full build process execution.
// Tasks (in order): clean -> next-build -> transpile -> copy
// Once this task is completed, there is an executable next project inside dist/
gulp.task('build', function(done){
  runSequence('clean', 'transpile', 'copy', function(){
    done();
  })
});

// Deletes all dist/ contents
gulp.task('clean', () => {
  del('dist/*');
  del('dist/.*');
});

// Copies files listed in 'copy' array. (See the top of this file)
gulp.task('copy', () => {
  gulp
  .src(copy, {base: '.'})
  .pipe(gulp.dest('dist'));
});

// builds css from sass
gulp.task('transpile', () => {
  return run('npm run build:babel').exec();
});

// Transpiles files listed in 'copy' array. (See the top of this file)
// gulp.task('transpile', () => {
//    gulp
//    .src(transpile, {base: '.'})
//    .pipe(babel())
//    .pipe(gulp.dest('dist'))
// });


var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');


// define tasks here
gulp.task('uglify', function() {
  gulp.src('*.js')
    .pipe(uglify('pelicanCult_responsive_1.0.min.js', {
      outSourceMap: true
    }))
});

gulp.task('compress', function() {
  gulp.src('*.js')
    .pipe(uglify('pelicanCult_responsive_1.0.min.js'))
    .pipe(gulp.dest('dist'))
});
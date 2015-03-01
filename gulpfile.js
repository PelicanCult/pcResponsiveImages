var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


// define tasks here
gulp.task('compress', function() {
  gulp.src('pelicanCult_responsive_1.0.js')
    .pipe(uglify({outSourceMap: true}))    
    .pipe(rename(function (path) {
        if(path.extname === '.js') {
            path.basename += '.min';
        }
    }))
    .pipe(gulp.dest('./'))
});
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
//var ugly = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('sass', function() {
	return gulp.src('css/scss/Specio.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
});

gulp.task('default', function() {
	gulp.watch('css/scss/*.scss',['sass']);
});
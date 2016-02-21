var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
//var ugly = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var flatten = require('gulp-flatten');

gulp.task('sass', function() {
	gulp.src(['css/scss/**/*.scss', 'app/**/*.scss'])
		.pipe(concat('style.scss'))
		.pipe(sass())
		.pipe(gulp.dest('../dist/css'));
});

gulp.task('app', function() {
	gulp.src([
		'./app/models.js',
		'./app/app.js',
		'!./app/components/_template/**/*.*',
		'./app/**/module.js',
		'./app/**/models.js',
		'./app/**/controllers.js',
		'./app/**/directives.js',
		'./app/**/routes.js',
		'./app/**/services.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('../dist/js/'));

	gulp.src("./app/**/templates/*.html")
		.pipe(flatten())
		.pipe(gulp.dest('../dist/templates/'));
});

gulp.task('transfer', function() {
	gulp.src('index.html')
		.pipe(gulp.dest('../dist/'));

	gulp.src('js/*.js')
		.pipe(gulp.dest('../dist/js/'));

	gulp.src([
		'css/**/*.css',
		'./bower_components/**/gridster.min.css',
		'./bower_components/**/jquery-ui.min.css',
		'./bower_components/**/base.css'
		]).pipe(gulp.dest('../dist/css/'));

	gulp.src([
		'./bower_components/**/jquery.min.js',
		'./bower_components/**/jquery-ui.min.js',
		'./bower_components/**/angular.min.js',
		'./bower_components/**/underscore-min.js'])
		.pipe(flatten())
		.pipe(gulp.dest('../dist/js'));
});

gulp.task('connect', function() {
	connect.server({
		root:'../dist/'
	});
});

gulp.task('default', ['connect'],function(){
	gulp.watch('index.html', ['transfer', 'sass']);
	gulp.watch(['app/**/*.js', 'app/**/*.html'], ['app']);
	gulp.watch(['app/**/*.scss', 'css/scss/Specio.scss'], ['sass']);
});

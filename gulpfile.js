var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	lost = require('lost'),
	connect = require('gulp-connect'),
	babel = require('gulp-babel');

gulp.task('jade', function() {
	return [
		gulp.src('./app/index.jade')
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest('./dev/'))
			.pipe(connect.reload()),
		gulp.src('./app/templates/**/*').pipe(connect.reload())
	]
});

gulp.task('sass', function() {
	var plugins = [
		autoprefixer({browsers: ['last 2 versions']}),
		lost
	];

	return [
		gulp.src('./app/styles/main.scss')
			.pipe(sass())
			.pipe(postcss(plugins))
			.pipe(gulp.dest('./dev/css/'))
			.pipe(connect.reload()),
		gulp.src('./app/styles/**/*').pipe(connect.reload())
	]
});

gulp.task('babel', function() {
	return [
		gulp.src('./app/scripts/main.js')
			.pipe(babel())
			.pipe(gulp.dest('./dev/js/'))
			.pipe(connect.reload()),
		gulp.src('./app/scripts/**/*').pipe(connect.reload())
	]
});

gulp.task('serv', function() {
	connect.server({
		root: './dev/',
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch(['./app/index.jade','./app/templates/**/*'], ['jade']);
	gulp.watch(['./app/styles/main.scss','./app/styles/**/*'], ['sass']);
	gulp.watch(['./app/scripts/main.js','./app/scripts/**/*'], ['babel']);
});

gulp.task('compile', ['jade','sass','babel']);
gulp.task('default', ['serv','watch']);
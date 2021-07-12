const gulp = require('gulp');
const { series } = require('gulp');
const pug = require('gulp-pug');
var sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

//compile scss into css
function style() {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function views() {
  return gulp.src('./src/pug/*.pug')
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(gulp.dest('./dist'));
}

function scripts(){
    return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'));
}

function watch() {
    browserSync.init({
        server: {
           baseDir: "./dist",
           index: "./index.html"
        }
    });
    gulp.watch('./src/scss/*.scss', series( style, browserSync.reload) );
    gulp.watch('./src/pug/*.pug').on('change', series( views, browserSync.reload) );
    gulp.watch('./src/js/*.js').on('change', series( scripts, browserSync.reload));
}

function main(cb){
    style();
    views();
    scripts();
    cb();
}
exports.style = style;
exports.watch = watch;
exports.views = views;
exports.default = main;
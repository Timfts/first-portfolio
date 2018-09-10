const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      cssNano = require('gulp-cssnano'),
      babel = require('gulp-babel');

const paths = {
    srcIndex:'./src/index.html',
    srcStyles:'./src/sass/**/*.scss',
    srcScript: './src/js/app.js',
    outputRoot: './docs',
    outputStyle: './docs/css',
    outputScript: './docs/js'

};

gulp.task('html', () => {
    return gulp.src(paths.srcIndex)
    .pipe(gulp.output(paths.outputRoot))
    .pipe(browserSync.stream());
});


gulp.task('sass', () => {
    return gulp.src(paths.srcStyles)
    .pipe(sass({
        outputStyle:'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.outputStyle))
    .pipe(browserSync.stream());
});


gulp.task('server', () => {
    browserSync.init({
        server:{
            baseDir:"docs"
        }
    });
    gulp.watch(paths.srcStyles,['sass']);
    gulp.watch(paths.srcIndex,['html'] );
});
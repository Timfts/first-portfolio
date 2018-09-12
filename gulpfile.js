const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      cssNano = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemap = require('gulp-sourcemaps');
      //autoprefixer = require('gulp-autoprefixer');

const paths = {
    srcIndex:'./src/index.html',
    srcStyles:'./src/sass/**/*.scss',
    srcScript: './src/js/app.js',
    srcImages:'./src/img/**/*.+(png|jpg|jpg|jpeg|gif|svg)',
    outputRoot: './docs',
    outputStyle: './docs/css',
    outputScript: './docs/js',
    outputImages: './docs/img'

};

gulp.task('html', () => {
    return gulp.src(paths.srcIndex)
    .pipe(gulp.dest(paths.outputRoot))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
    return gulp.src(paths.srcImages)
    .pipe(gulp.dest(paths.outputImages))
    .pipe(browserSync.stream());
});


gulp.task('sass', () => {
    return gulp.src(paths.srcStyles)
    .pipe(sass({
        errLogToConsole: true,
        outputStyle:'compressed'
    })
    .on('error', sass.logError))
    .pipe(sourcemap.write('./docs/css/maps'))
    .pipe(autoprefixer())
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
    gulp.watch(paths.srcImages,['images'] );
});
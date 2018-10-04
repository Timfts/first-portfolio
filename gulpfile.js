const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemap = require('gulp-sourcemaps'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify');

const paths = {
    srcIndex:'./src/index.html',
    srcStyles:'./src/sass/**/*.scss',
    srcScript: './src/js/**/*.js',
    srcImages:'./src/img/**/*.+(png|jpg|jpg|jpeg|gif|svg)',
    buildRoot: './docs',
    buildStyle: './docs/css',
    buildScript: './docs/js',
    buildImages: './docs/img',
    prodRoot: './prod',
    prodStyle: './prod/css',
    prodMaps: './maps',
    prodScript: './prod/js',
    prodImages: './prod/img'

};






//Production

gulp.task('htmlProd', () => {
    return gulp.src(paths.srcIndex)
    .pipe(gulp.dest(paths.prodRoot))
    .pipe(browserSync.stream());
});


gulp.task('sassProd', () => {
    return gulp.src(paths.srcStyles)
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemap.write(paths.prodMaps))
    .pipe(gulp.dest(paths.prodStyle))
    .pipe(browserSync.stream());
});


gulp.task('jsProd', () => {
    return gulp.src(paths.srcScript)
    .pipe(sourcemap.init())
    .pipe(babel())
    .pipe(sourcemap.write('maps'))
    .pipe(gulp.dest(paths.prodScript))
    .pipe(browserSync.stream());
});


gulp.task('imagesProd', () => {
    return gulp.src(paths.srcImages)
    .pipe(gulp.dest(paths.prodImages))
    .pipe(browserSync.stream());
});

gulp.task('prod', ['htmlProd', 'sassProd', 'jsProd', 'imagesProd']);

gulp.task('serve', () => {
    browserSync.init({
        server:{
            baseDir:"prod"
        }
    });

    gulp.watch(paths.srcIndex,['htmlProd'] );
    gulp.watch(paths.srcStyles,['sassProd']);
    gulp.watch(paths.srcScript,['jsProd']);
    gulp.watch(paths.srcImages,['imagesProd'] );
});




//build

gulp.task('htmlBuild', () => {
    return gulp.src(paths.srcIndex)
    .pipe(gulp.dest(paths.buildRoot));
});

gulp.task('sassBuild', () => {
    return gulp.src(paths.srcStyles)
    .pipe(sass({
        errLogToConsole: true,
        outputStyle:'compressed'
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 0.5%', 'not dead']
    }))
    .pipe(gulp.dest(paths.buildStyle));
});

gulp.task('jsBuild', () => {
    return gulp.src(paths.srcScript)
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.buildScript));
});


gulp.task('build', ['htmlBuild', 'sassBuild', 'jsBuild']);
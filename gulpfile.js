var gulp = require('gulp');
var gulpDel = require('del');
var gulpSourceMaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpAutoPrefixer = require('gulp-autoprefixer');
var gulpCleanCss = require('gulp-clean-css');
var gulpImageMin = require('gulp-imagemin');

var production = process.env.NODE_ENV === 'production';
var paths = {
    vendors: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/magnific-popup/dist/jquery.magnific-popup.js'
    ],
    scripts: [
        'public/js/common.js',
        'public/js/home.js'
    ],
    images: 'public/img/**/*',
    styles: 'public/css/**/*',
    fonts: 'public/fonts/**/*'
};

// Combine all JS libraries into a single file
gulp.task('cleanVendor', function () {
    return gulpDel(['dist/js/vendor.js']);
});
gulp.task('cleanBundle', function () {
    return gulpDel(['dist/js/bundle.js']);
});
gulp.task('cleanCss', function () {
    return gulpDel(['dist/css']);
});
gulp.task('cleanImg', function () {
    return gulpDel(['dist/img']);
});
gulp.task('cleanFont', function () {
    return gulpDel(['dist/fonts']);
});

gulp.task('vendors', ['cleanVendor'], function(){
    return gulp.src(paths.vendors)
        .pipe(gulpSourceMaps.init())
        .pipe(gulpConcat('vendor.js'))
        .pipe(gulpIf(production, gulpUglify()))
        .pipe(gulpSourceMaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', ['cleanBundle'], function(){
    return gulp.src(paths.scripts)
        .pipe(gulpSourceMaps.init())
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulpIf(production, gulpUglify()))
        .pipe(gulpSourceMaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', ['cleanCss'], function(){
    return gulp.src(paths.styles)
        .pipe(gulpSourceMaps.init())
        .pipe(gulpAutoPrefixer())
        .pipe(gulpConcat('bundle.css'))
        .pipe(gulpCleanCss({compatibility: 'ie8'}))
        .pipe(gulpSourceMaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('images', ['cleanImg'], function(){
    return gulp.src(paths.images)
        .pipe(gulpImageMin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', ['cleanFont'], function(){
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/fonts'));
});

// The watch task
gulp.task('watch', function () {
    gulp.watch(paths.vendors, ['vendors']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
});

// The build task (called when npm has finished install, `postinstall` in package.json)
gulp.task('build', ['vendors', 'scripts', 'styles', 'images', 'fonts']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build', 'watch']);

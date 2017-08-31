const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
    return gulp.src([
        'node_modules/bootstrap/less/bootstrap.less',
        'node_modules/animate.css/animate.min.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
        'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
        'src/less/*.less'
    ])
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
        'node_modules/wowjs/dist/wow.min.js',
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
        'node_modules/jquery.counterup/jquery.counterup.min.js',
        'node_modules/waypoints/lib/jquery.waypoints.min.js',
        'src/scripts/*.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['less'], function(){
    browserSync.init({
        server: "./src"
    });

    gulp.watch([
        'node_modules/bootstrap/less/bootstrap.less', 'src/less/*.less'
    ], ['less']);

    gulp.watch([
        'src/scripts/*.js'
    ], ['js']);

    gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task('fonts', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("src/fonts"));
});


gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("src/css"));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
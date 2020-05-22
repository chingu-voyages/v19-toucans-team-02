/* to install all the needed packages, copy and paste in the terminal/command line the following lines (one by one)

npm install gulp-sass --save-dev
npm install gulp-notify --save-dev
npm install gulp-autoprefixer --save-dev
npm install gulp-cssnano --save-dev
npm install gulp-concat-css --save-dev
npm install gulp-jsvalidate --save-dev
npm install gulp-terser --save-dev

or all toghether in that way:

npm install gulp-sass gulp-notify gulp-autoprefixer gulp-cssnano gulp-concat-css gulp-jsvalidate gulp-terser --save-dev

*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concatcss = require('gulp-concat-css'),
    concatjs = require('gulp-concat'),
    jsvalidate = require('gulp-jsvalidate'),
    terser = require('gulp-terser');

var theme = './',
    sass_file = theme + 'assets/sass/theme.scss',
    sass_folder = theme + 'assets/sass/*.scss',
    css_output_folder = theme + 'public/css',
    js_input = theme + 'assets/js/*.js',
    js_output = theme + 'public/js/',
    css_output_file = 'main.css',
    js_output_file = 'concat.js', 
    js_compressed_file = 'all.min.js';


// merge all the sass file and compile it into css
gulp.task('sass-compile', function () {
    return gulp.src(sass_file)
        .pipe(sass().on('error', sass.logError))
        .pipe(concatcss(css_output_file))
        .pipe(gulp.dest(css_output_folder))
        .pipe(notify({
            message: 'Sass compiled',
            onLast: true
        }));
});

// check the css for browser compatibility and compress
gulp.task('css-format', function () {
    return gulp.src('./public/css/*.css')
        .pipe(autoprefixer('last 3 version'))
        .pipe(concatcss(css_output_file))
        .pipe(cssnano())
        .pipe(gulp.dest(css_output_folder))

        .pipe(notify({
            message: 'Css compressed',
            onLast: true
        }));
});

// check the js and merge in one file
gulp.task('js-concat', function () {
    return gulp.src(js_input)
        .pipe(jsvalidate())
        .pipe(concatjs(js_output_file))
        .pipe(gulp.dest(js_output))
        .pipe(notify({
            message: 'Js merged',
            onLast: true
        }));
});

// compress the js file
gulp.task('js-compress', function () {
    return gulp.src('./public/js/' + js_output_file)
        .pipe(concatjs(js_compressed_file))
        .pipe(terser({
            mangle: {
                toplevel: true
            }
        }))
        .pipe(gulp.dest(js_output))
        
        .pipe(notify({
            message: 'JS minified',
            onLast: true
        }));
});

// run gulp when sass or js files have changes
gulp.task('watch', function () {
    gulp.watch(sass_folder, gulp.series('sass-compile', 'css-format'));
    gulp.watch(js_input, gulp.series('js-concat', 'js-compress'));
   
}); 

gulp.task('default', gulp.series('sass-compile', 'css-format', 'js-concat', 'js-compress', 'watch'), function (done) {});
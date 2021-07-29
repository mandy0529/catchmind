import gulp from 'gulp';
const sass = require('gulp-sass')(require('node-sass'));
sass.compiler = require('node-sass');
import autoprefixer from 'gulp-autoprefixer';
import minify from 'gulp-csso';
import del from 'del';
import bro from 'gulp-bro';
import babelify from 'babelify';

const routes = {
  styles: {
    watch: 'assets/scss/**/*.scss',
    src: 'assets/scss/styles.scss',
    dest: 'src/static/css',
  },
  js: {
    watch: 'assets/js/**/*.js',
    src: 'assets/js/main.js',
    dest: 'src/static/js',
  },
};

const styles = () => {
  return gulp
    .src(routes.styles.src)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(gulp.dest(routes.styles.dest));
};

const js = () => {
  return gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({presets: ['@babel/preset-env']}),
          ['uglifyify', {global: true}],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));
};

const clean = () => {
  return del(['src/static']);
};
const watch = () => {
  gulp.watch(routes.styles.watch, styles);
  gulp.watch(routes.js.watch, js);
};

export const dev = gulp.series([clean, styles, js, watch]);

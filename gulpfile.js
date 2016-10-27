// gulp
var argv = require('yargs').argv;
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var server = require('gulp-server-livereload');
var util = require('gulp-util');

// css
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');

// js
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var tslint = require("gulp-tslint");
var uglify = require('gulp-uglify');
var watchify = require('watchify');

// html
var usemin = require('gulp-usemin');

// tests
var Server = require('karma').Server;

var paths = {
  entry: './app/app.ts',
  www: './www/',
  config: './config/',
  img: './app/resources/img/**/*',
  fonts: './app/resources/fonts/**/*',
  html: './app/**/*.html',
  sass: './app/styles/**/*.scss',
  ts: './app/**/*.ts'
};

// Workaround for max listeners
require('events').EventEmitter.prototype._maxListeners = 30;

gulp.task('default', ['serve']);

gulp.task('clean', cleanTask);
gulp.task('config',  configTask);
gulp.task('html', htmlTask);
gulp.task('img', imgTask);
gulp.task('fonts', fontsTask);
gulp.task('sass', sassTask);
gulp.task('ts', ['config'], tsTask);
gulp.task('copy', ['config', 'img', 'fonts', 'html', 'sass', 'ts']);
gulp.task('serve', ['watch'], serveTask);
gulp.task('test', ['config'], testTask);
gulp.task('tdd', ['config'], tddTask);
gulp.task('ts-style', ['config'], tsStyleTask);
gulp.task('watch', ['copy'], watchTask);

function cleanTask() {
  printLog('Limpiando archivos');
  return del(paths.www);
}

function configTask() {
  var configEnv = argv.c || argv.config || 'Development';

  printLog('Copying files for environment: ' + configEnv);
  return gulp.src(paths.config + configEnv + '/**/*')
    .pipe(gulp.dest('./app/config/'));
}

function htmlTask() {
  var isRelease = argv.r || argv.release;
  return gulp.src(paths.html)
    .pipe(gulpif(
      isRelease,
      usemin({
        css: [minifyCss({ keepBreaks: true }), 'concat'],
        js: [uglify()]
      })
    ))
    .pipe(gulp.dest(paths.www));
}

function imgTask() {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.www + '/resources/img/'));
}

function fontsTask() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.www + '/resources/fonts/'));
}

function sassTask() {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.www + '/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.www + '/css/'));
}

function tsTask() {
  return watchify(browserify({
      basedir: '.',
      debug: true,
      entries: [paths.entry],
      cache: {},
      packageCache: {}
    }))
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.www));
}

function serveTask() {
  return gulp.src(paths.www)
    .pipe(server({
      port: 8100,
      livereload: true,
      open: true
    }));
}

function testTask(done) {
  var server = new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  });

  server.on('run_complete', function (browsers, results) {
    done(results.error ? 'There are test failures' : null);
  });

  server.start();
}

function tddTask(done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    autoWatch: true,
    singleRun: false
  }, done).start();
}

function tsStyleTask() {
  return gulp.src(paths.ts)
    .pipe(tslint({
      formatter: 'verbose',
      configuration: './tslint.json'
    }))
    .pipe(tslint.report({
      summarizeFailureOutput: true
    }));
}

function watchTask() {
  gulp.watch(paths.config + '**/*', ['config']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ts, ['ts']);
}

function printLog(msg) { return util.log(util.colors.cyan(msg)); }
function printError(msg) { return util.log(util.colors.red(msg)); }

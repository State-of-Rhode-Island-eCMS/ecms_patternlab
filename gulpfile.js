/******************************************************
 * RI Gov Pattern Lab - Gulp File
 * Uses pattern-lab/edition-node-gulp as a scaffold
 * and then adds on CSS / JS compilation
 ******************************************************/

const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');

/******************************************************
 * Custom Tasks - CSS / JS Compilation
 ******************************************************/

// Source directories to search for SCSS / JS files to compile.
// By default, node-sass does not compile files that begin with _.
const scssSourcePaths = [
  "source/**/*.scss"
];

const javascriptSourcePaths = [
  "source/**/*.js"
];

const patternLabSourcePaths = [
  "source/**/*.twig"
];

// Default task.
gulp.task('default', ['build']);

gulp.task('build', ['build:js', 'build:sass']);

// Build Tasks
gulp.task('build:js', () => {
  return gulp
    .src(javascriptSourcePaths)
    .pipe(concat("pattern-lab-compiled.js"))
    .pipe(minify())
    .pipe(gulp.dest('./public/js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build:sass', () => {
  return gulp
    .src(['source/**/*.js'])
    .pipe(sassGlob())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest((file) => {
      return file.base;
    }))
    .pipe(rename('pattern-lab-compiled-min.css'))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', function(){
  gulp.watch(scssSourcePaths, {cwd: 'source'} ['build:sass']);
  gulp.watch(['source/**/*.js'],['build:js']);
  gulp.watch(patternLabSourcePaths, {cwd: 'source'}, ['patternlab:serve']);
});


/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
 ******************************************************/
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);

function build() {
  return patternlab
    .build({
      watch: argv.watch,
      cleanPublic: config.cleanPublic,
    })
    .then(() => {
      // do something else when this promise resolves
    });
}

function serve() {
  return patternlab.server
    .serve({
      cleanPublic: config.cleanPublic,
      watch: true,
    })
    .then(() => {
      // do something else when this promise resolves
    });
}

gulp.task('patternlab:version', function() {
  console.log(patternlab.version());
});

gulp.task('patternlab:patternsonly', function() {
  patternlab.patternsonly(config.cleanPublic);
});

gulp.task('patternlab:liststarterkits', function() {
  patternlab.liststarterkits();
});

gulp.task('patternlab:loadstarterkit', function() {
  patternlab.loadstarterkit(argv.kit, argv.clean);
});

gulp.task('patternlab:build', function() {
  build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:serve', function() {
  serve().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('default', ['patternlab:help']);

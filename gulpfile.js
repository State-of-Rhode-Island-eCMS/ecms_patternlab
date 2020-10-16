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
const sassImportJson = require('gulp-sass-import-json');
const jeditor = require('gulp-json-editor');
const streamify = require('gulp-streamify');

/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
 ******************************************************/
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);

gulp.task('patternlab:build', () => {
  return patternlab
    .build({
      watch: argv.watch,
      cleanPublic: config.cleanPublic,
    })
});

gulp.task('patternlab:serve', () => {
  return patternlab.server
    .serve({
      cleanPublic: config.cleanPublic,
      watch: true,
    })
});

// gulp.task('patternlab:version', function() {
//   console.log(patternlab.version());
// });

// gulp.task('patternlab:patternsonly', function() {
//   patternlab.patternsonly(config.cleanPublic);
// });

// gulp.task('patternlab:liststarterkits', function() {
//   patternlab.liststarterkits();
// });

// gulp.task('patternlab:loadstarterkit', function() {
//   patternlab.loadstarterkit(argv.kit, argv.clean);
// });

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

// Generate colors file
gulp.task('generate-colors', function () {
  return gulp
    .src("source/_data/color-config.json")
    .pipe(streamify(jeditor(function (json) {
      const generatedJson = {}
      const colorArray = [];

      for (let [color, value] of Object.entries(json.colors)) {
        colorArray.push({
          name: color,
          hex: value.hex
        })
      }

      for (let [palette, value] of Object.entries(json.palettes)) {
        value.values.map((paletteConfig) => {
          const hexValue = colorArray.find((item) => item.name === paletteConfig.colorName);
          generatedJson[`t__${palette}__${paletteConfig.fnName}`] = hexValue.hex;
        })
      }

      return generatedJson;
    })))
    .pipe(rename('colors-generated.json'))
    .pipe(gulp.dest('source/_data/'));
});

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
    .src(scssSourcePaths)
    .pipe(sassGlob())
    .pipe(sassImportJson({isScss: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }))
    .pipe(rename('pattern-lab-compiled.css'))
    .pipe(gulp.dest('./dist/css'))
});

// Build All
gulp.task('build', gulp.series('build:js', 'generate-colors', 'build:sass', 'patternlab:build'));

// Build only SASS JS
gulp.task('build:no-patterns', gulp.parallel('build:js', 'build:sass'));

// Watch tasks
gulp.task('watch:js', () => {
  return gulp.watch(javascriptSourcePaths, gulp.series('build:js'));
});

gulp.task('watch:sass', () => {
  return gulp.watch(scssSourcePaths, gulp.series('build:sass'));
});

gulp.task('watch', gulp.parallel('watch:js', 'watch:sass'));

// Default task
// Patternlab:serve handles building/watching patterns
gulp.task('default', gulp.series('generate-colors', 'build:no-patterns', 'patternlab:serve', 'watch'));

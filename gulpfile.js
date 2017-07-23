var cwd = process.cwd(),
  
    // Require all gulp modules
    fs = require('fs'),
    nodePath = require('path'),
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),

    // Source and destination paths
    paths = {
      sass: {
        in: 'src/css/sass/*.scss',
        out: 'public/css'
      },
      scripts: {
        in: 'src/js',
        out: 'public/js'
      },
      images: {
        in: 'src/images/**/*',
        out: 'public/images'
      },
      // No in & out paths here, as these folders will simply be moved in there entirety
      toMove: [
        'src/fonts/**/*',
        'src/css/*.*',
        'src/css/fonts/*.*',
        'src/svg/*.*'
      ]
    },

    /**
     * Get the base path of a folder path.
     * E.g. src/styles/sass/ -> sass
     * @param  string path
     * @return string
     */
    basePath = function( path ) {
      return path.split(/[\\/]/).pop();
    }

    /**
     * Strip the base path from a folder path.
     * E.g. src/styles/sass/ -> src/styles
     * @param  string path
     * @return string
     */
    stripBasePath = function( path ) {
      var parts = path.split(/[\\/]/);

      parts.pop();
      return parts.join('/');
    },
 
    /**
     * Get a file path, relative to the root folder. 
     * @param  string path
     * @return string
     */
    rootDir = function( path ) {
      return '/' + cwd.split(/[\\/]/).pop() + '/' + path;
    },

    /**
     * Get subfolders of a parent folder.
     * @param  string dir
     * @return array (I think? :P)
     */
    getFolders = function( dir ) {
      return fs.readdirSync(dir)
        .filter( function(file) {
          return fs.statSync( nodePath.join( dir, file ) ).isDirectory();
        } );
    };


/**
 * Process all Sass files into CSS.
 * Uses autoprefixer for browser prefixes:
 *   Last 2 major versions of browsers,
 *   Any browser that has more than 5% global usage
 *   IE 9 specifically
 * Creates:
 *     Main .css file
 *     Minified .css file
 *     Sourcemap for minified file
 */
gulp.task('styles', function() {
  return sass( paths.sass.in, { style: 'expanded', require: 'sass-globbing', sourcemap: true } )
    .pipe( autoprefixer( {
        browsers: ['last 2 versions', '> 5%', 'IE 9']
    } ) )
    .pipe( gulp.dest( paths.sass.out ) )
    .pipe( rename( {suffix: '.min'} ) )
    .pipe( cssnano( {autoprefixer: false} ) )
    .pipe( gulp.dest( paths.sass.out ) )
    .pipe( sourcemaps.write( 'maps', {
        includeContent: false,
        sourceRoot: rootDir( stripBasePath( paths.sass.in ) )
    } ) )
    .pipe( gulp.dest( paths.sass.out ) )
    .pipe( notify( { message: 'Styles task complete', onLast: true } ) );
});

/**
 * Process all script files, into combined .js files.
 * Creates:
 *     2 files per subfolder in src/scripts folder, main .js file and minified
 *     Sourcemap for each minified file created
 */
gulp.task('scripts', function() {
  return getFolders( paths.scripts.in ).map( function( folder ) {
    return gulp.src( nodePath.join( paths.scripts.in, folder, '/**/*.js' ) )
    .pipe( jshint() )
    .pipe( jshint.reporter('default') )
    .pipe( sourcemaps.init() )
    .pipe( concat( folder + '.js' ) )
    .pipe( gulp.dest( paths.scripts.out ) )
    .pipe( rename( {suffix: '.min'} ) )
    .pipe( uglify() )
    .pipe( gulp.dest( paths.scripts.out ) )
    .pipe( sourcemaps.write( 'maps', {
      includeContent: false,
      sourceRoot: rootDir( nodePath.join( paths.scripts.in, folder ) )
    } ) )
    .pipe( gulp.dest( paths.scripts.out ) )
    .pipe( notify( { message: 'Scripts task [' + folder + '] complete', onLast: true } ) );
  } );
});

/**
 * Process any images and optimise them.
 */
gulp.task('images', function() {
  return gulp.src( paths.images.in )
    .pipe( cache( imagemin( { optimizationLevel: 5, progressive: true, interlaced: true } ) ) )
    .pipe( gulp.dest( paths.images.out ) )
    .pipe( notify( { message: 'Images task complete', onLast: true } ) );
});

/**
 * Move files from the src folder into the public folder.
 */
gulp.task('move', function() {
  // The base option sets the relative root for the set of files, preserving the folder structure
  return gulp.src( paths.toMove, { base: 'src/' })
  .pipe( gulp.dest('public') )
  .pipe( notify( { message: 'Move files task complete', onLast: true } ) );
});

/**
 * Clean up the production folders.
 * Deletes the specified directories, leaving the folder clean for next run.
 */
gulp.task('clean', function() {
  return del( ['public/css', 'public/js', 'public/fonts', 'public/svg', 'public/images'] );
});

/**
 * Clean up the production folders apart from images.
 * Deletes the specified directories, leaving the folder clean for next run.
 */
gulp.task('clean-not-images', function() {
  return del( ['public/css', 'public/js', 'public/fonts', 'public/svg'] );
});

/**
 * Watch for any changes to the src files, and run tasks needed.
 */
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch( 'src/css/sass/**/*.scss', ['styles'] );

  // Watch .js files
  gulp.watch( 'src/js/**/*.js', ['scripts'] );

  // Watch image files
  // gulp.watch( 'src/images/**/*', ['images'] );

  // Watch any other files in the styles directory
  gulp.watch( 'src/css/*.*', ['move'] );
  
  // Watch font files
  gulp.watch( 'src/fonts/**/*', ['move'] );

  // Watch SVG files
  gulp.watch( 'src/svg/**/*', ['move'] );
});

/**
 * Default task, run with: $ gulp
 * Cleans the destination directory, then runs each task async.
 */
gulp.task('default', ['clean'], function() {
  gulp.start( 'styles', 'scripts', 'images', 'move' );
});

gulp.task('not-images', ['clean-not-images'], function() {
  gulp.start( 'styles', 'scripts', 'move' );
});

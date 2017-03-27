// gulp
var gulp = require("gulp");

// regular usage
var copy = require("gulp-copy");
var concat = require("gulp-concat");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

// for js
var webpack = require('gulp-webpack');
var uglify = require("gulp-uglify");

// for css
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var kss = require("gulp-kss");

// パス管理
var paths = {
  js : {
    src         : "./src/js",
    dest        : "./htdocs/js",
    files       : "/**/*.js",
    ignorefiles : "/lib/**/*.js",
    lib         : "lib"
  },
  styles : {
    src      : "./src/sass",
    dest     : "./htdocs/css",
    files    : "/**/*.scss",
    mainfile : "style.css",
    lib      : "lib"
  },
  styleguides : {
    dest     : "./guide",
    files    : "/**/*",
    overview : "guide.md"
  },
  templates : {
    src      : "./src/template",
    files    : "/**/*.html"
  },
  // watch時に変更が合ったらbrowser.reloadする対象
  watchfiles : [
    "./htdocs/**/*.html"
  ]
};

// webpackの設定
var config = {
  webpack: {
    entry: {
      app:paths.js.src + "/" + "app.js"
    },
    output: {
      // path: paths.js.dest,
      filename: "[name].js"
    },
    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin('app','app.js')
    // ]
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        { test: /\.html$/, loader: 'html-loader' },
      ]
    },
  }
}

// library系ファイルをsrc配下からhtdocs配下へコピー
gulp.task("copy", function(){
  gulp.src([paths.js.src + "/" + paths.js.lib + "/**/*"], { base : paths.js.src })
    .pipe(plumber())
    .pipe(gulp.dest(paths.js.dest));
  gulp.src([paths.styles.src + "/" + paths.styles.lib + "/**/*"], { base : paths.styles.src })
    .pipe(plumber())
    .pipe(gulp.dest(paths.styles.dest));
});

// jsのuglify
gulp.task("js", function() {
  // gulp.src([paths.js.src + paths.js.files, paths.js.src + paths.js.ignorefiles])
  gulp.src([config.webpack.entry.app])
    .pipe(plumber())
    .pipe(webpack(config.webpack))
    // .pipe(uglify({
    //   mangle : false,
    //   compress : false,
    //   preserveComments : 'some'
    // }))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browser.reload({stream:true}));
});

// style guideの作成
gulp.task("kss", function() {
  gulp.src(paths.styles.src + paths.styles.files)
    .pipe(plumber())
    .pipe(kss({
      overview: paths.styles.src + "/" + paths.styleguides.overview
    }))
    .pipe(gulp.dest(paths.styleguides.dest));
});

// sassのコンパイルと結合 + style guide用css更新
gulp.task("sass", function() {
  gulp.src(paths.styles.src + paths.styles.files)
    .pipe(plumber())
    .pipe(concat(paths.styles.mainfile))
    .pipe(sass({
      // outputStyle : "compressed"
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulp.dest(paths.styleguides.dest + "/public"))
    .pipe(browser.reload({stream:true}));
});

// default gulpタスク設定
gulp.task("default", function() {
  gulp.start('copy', 'kss', 'sass', 'js');
});

// browserSync用サーバ立ち上げ
gulp.task("server", function() {
  browser({
    server: {
      baseDir: "./htdocs/"
    }
  });
});

// browserSyncで立ち上げたページをリロード
gulp.task("reload", function() {
  browser.reload();
});

// file監視
gulp.task("watch", ["server"], function() {
  gulp.watch([paths.js.src + paths.js.files, paths.js.src + paths.js.ignorefiles], ["js"]);
  gulp.watch(paths.styles.src + paths.styles.files, ["kss", "sass"]);
  gulp.watch(paths.templates.src + paths.templates.files, ["js"]);
  gulp.watch(paths.watchfiles, ["reload"]);
});

//Dependencies
const autoPrefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const gulpUtil = require("gulp-util");
const minCSS = require("gulp-clean-css");
const minHTML = require("gulp-htmlmin");
const postCSS = require("gulp-postcss");
const sass = require("gulp-sass");
const sourceMaps = require("gulp-sourcemaps");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackUglify = require("uglifyjs-webpack-plugin");

//Config
const config = {
    
    DEVELOPMENT: gulpUtil.env.development,
    PRODUCTION: gulpUtil.env.production
};

//Tasks
const tasks = {

    TRANSPILE_JS: "transpile-js",
    TRANSPILE_SASS: "transpile-sass",
    TRANSPILE_HTML: "transpile-html"
};

//Paths
const PATHS_ROOT = "./resources/";

const paths = {

    ROOT: `${PATHS_ROOT}`,
    BUILD: `${PATHS_ROOT}build/`,
    SOURCE: `${PATHS_ROOT}source/`
};

//Folders
const folders = {

    JS: "js/",
    CSS: "css/",
    SASS: "sass/",
};

//Files
const files = {

    JS: "main.js",
    CSS: "main.css",
    SASS: "main.scss",
    HTML: "index.html",
};

//Task Transpile JavaScript
gulp.task(tasks.TRANSPILE_JS, () => {

    gulp.src(`${paths.SOURCE}${folders.JS}${files.JS}`)
        .pipe(
            webpackStream({
                module: {
                    rules: [{
                        test: /\.js$/,
                        loader: "babel-loader",
                        exclude: /(node_modules)/,
                        options: {
                            presets: [["latest", {"es2015": {"modules": false}}]]
                        }
                    }]
                },
                plugins: (config.PRODUCTION) ? [new webpackUglify({
                                                    compress: {warnings: true},
                                                    sourceMap: (config.DEVELOPMENT)})
                                               ]
                                             : [],
                output: {filename: `${files.JS}`},
                devtool: (config.DEVELOPMENT) ? "inline-source-map" : ""
            }, webpack)
            .on("error", (error) => gulpUtil.log(error)))
        .pipe(gulp.dest(`${paths.BUILD}${folders.JS}`))
        .pipe((config.DEVELOPMENT) ? browserSync.stream() : gulpUtil.noop());
});

//Task Transpile Sass
gulp.task(tasks.TRANSPILE_SASS, () => {

    gulp.src(`${paths.SOURCE}${folders.SASS}${files.SASS}`)
        .pipe((config.DEVELOPMENT) ? sourceMaps.init() : gulpUtil.noop())
        .pipe(
            sass({
                outFile: `${files.CSS}`
            })
            .on("error", sass.logError))
        .pipe(
            postCSS([
                autoPrefixer()
            ]))
        .pipe((config.PRODUCTION) ? minCSS() : gulpUtil.noop())
        .pipe((config.DEVELOPMENT) ? sourceMaps.write() : gulpUtil.noop())
        .pipe(gulp.dest(`${paths.BUILD}${folders.CSS}`))
        .pipe((config.DEVELOPMENT) ? browserSync.stream() : gulpUtil.noop());
});

//Task Copy HTML
gulp.task(tasks.TRANSPILE_HTML, () => {

    gulp.src(`${paths.SOURCE}${files.HTML}`)
        .pipe(minHTML({collapseWhitespace: true}))
        .pipe(gulp.dest(`${paths.BUILD}`))
        .pipe((config.DEVELOPMENT) ? browserSync.stream() : gulpUtil.noop());
});

//Task Default
gulp.task("default", [tasks.TRANSPILE_JS, tasks.TRANSPILE_SASS, tasks.TRANSPILE_HTML], () => {

    if (config.DEVELOPMENT) {
        
        browserSync.init({
            server: {
                baseDir: `${paths.BUILD}`,
                index: `${files.HTML}`
            }
        });

        gulp.watch(`${paths.SOURCE}${folders.JS}**/*.js`, [tasks.TRANSPILE_JS]);
        gulp.watch(`${paths.SOURCE}${folders.SASS}**/*.scss`, [tasks.TRANSPILE_SASS]);
        gulp.watch(`${paths.SOURCE}${files.HTML}`, [tasks.TRANSPILE_HTML]);
    }
});
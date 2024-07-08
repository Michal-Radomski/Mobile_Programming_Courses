import { src, dest, watch, parallel } from "gulp";

const gulpCopy = require("gulp-copy");
// const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const ts = require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

//* File paths
const files = {
  images: "src/src/images/**/*",
  sassPath: "src/src/scss/**/*.scss",
  tsPath: "src/src/ts/*.ts",
  htmlPath: "src/index.html",
  favIcon: "src/favicon.ico",
  helpPath: "src/help/index.html",
};

//* HTML
function htmlTask() {
  return src([files.htmlPath, files.favIcon])
    .pipe(gulpCopy("public", { prefix: 1 }))
    .pipe(dest("public"))
    .pipe(browserSync.stream());
}

function helpTask() {
  return src([files.helpPath])
    .pipe(gulpCopy("public", { prefix: 1 }))
    .pipe(dest("public/help"))
    .pipe(browserSync.stream());
}

function imgTask() {
  return src(files.images).pipe(dest("public/src/images")).pipe(browserSync.stream());
}

//* Sass to CSS
function sassTask() {
  return src(files.sassPath)
    .pipe(sass({ outputStyle: "compressed" })) // Compile SCSS to CSS; empty object causes error
    .pipe(dest("public/src/css"))
    .pipe(browserSync.stream());
}

//* TS
function tsTask() {
  return src(files.tsPath).pipe(tsProject()).pipe(uglify()).pipe(dest("public/src/js")).pipe(browserSync.stream());
}

//* Browser Sync
function browser_Sync() {
  browserSync.init({
    files: ["./dist/**/*."],
    notify: false,
    open: false,
    server: {
      baseDir: "./dist",
    },
    port: 3000,
  });
}

//* Watch files
function watchFiles() {
  watch(files.htmlPath, htmlTask);
  watch(files.helpPath, helpTask);
  watch(files.images, imgTask);
  watch(files.sassPath, sassTask);
  watch(files.tsPath, tsTask);
}

//* Export
exports.default = parallel(watchFiles, browser_Sync);

import { src, dest, watch } from "gulp";

const gulpCopy = require("gulp-copy");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const ts = require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

//* File paths
const files = {
  images: "src/src/images/**/*",
  sassPath: "src/src/scss/**/*.scss",
  tsPath: "src/src/ts/*.ts",
  htmlPath: "src/index.html",
  favIcon: "src/favicon.ico",
  manifestFile: "src/manifest.json",
  helpPath: "src/help/index.html",
};

//* HTML
function htmlTask() {
  return src([files.htmlPath, files.favIcon, files.manifestFile])
    .pipe(gulpCopy("public", { prefix: 1 }))
    .pipe(dest("public"));
}

function helpTask() {
  return src([files.helpPath])
    .pipe(gulpCopy("public", { prefix: 1 }))
    .pipe(dest("public/help"));
}

function imgTask() {
  return src(files.images).pipe(dest("public/src/images"));
}

//* Sass to CSS
function sassTask() {
  return src(files.sassPath)
    .pipe(sass({ outputStyle: "compressed" })) // Compile SCSS to CSS; empty object causes error
    .pipe(dest("public/src/css"));
}

//* TS
function tsTask() {
  return src(files.tsPath).pipe(tsProject()).pipe(uglify()).pipe(dest("public/src/js"));
}

//* Watch files
function watchFiles() {
  watch(files.htmlPath, htmlTask);
  watch(files.manifestFile, htmlTask);
  watch(files.helpPath, helpTask);
  watch(files.images, imgTask);
  watch(files.sassPath, sassTask);
  watch(files.tsPath, tsTask);
}

//* Export
exports.default = watchFiles;

var gulp = require("gulp"),
    jasmine = require("gulp-jasmine"),
    header = require("gulp-header"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    pkg = require("./package.json");

var d = new Date();
var releaseDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()

var fileStack = [
  "src/setup.js",
  "src/behavior_lab.js",
  "src/boundary_lab.js",
  "src/controller_lab.js",
  "src/helper_lab.js",
  "src/dom_lab.js"
];

var banner = [
  "// Stik-labs - Version: <%= pkg.version %> | From: <%= date %>\n",
""].join("\n");

gulp.task("test", function(){
  gulp.src("specs/*_spec.js")
      .pipe(jasmine());
});

gulp.task("pack", function(){
  gulp.src(fileStack)
      .pipe(concat("stik-labs.js"))
      .pipe(header(banner, { pkg: pkg, date: releaseDate }))
      .pipe(gulp.dest("dist"))
      .pipe(concat("stik-labs.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("dist"));
});

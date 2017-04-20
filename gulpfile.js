var gulp=require("gulp");
var uglify=require("gulp-uglify");
var rename=require("gulp-rename");
var concat=require("gulp-concat");
var minifycss=require("gulp-minify-css");
var mainbower=require("gulp-main-bower-files");
var filter=require("gulp-filter");
var inject=require("gulp-inject");
var stream=require("stream-series");
var connect = require("gulp-connect");
var cachetpl = require("gulp-angular-templatecache");
gulp.task("prod",['js','css','bowerjs',"cachetpl","createhtml","connect"],function(){
	console.log("done");
})
var js,css,bowerjs, tpl;
gulp.task("js",function() {
	js = gulp.src("./app/js/**/*.js")
	.pipe(concat("app.js"))
	.pipe(uglify())
	.pipe(gulp.dest("./build/js"));
})

gulp.task("css",function() {
	css =gulp.src("./app/assets/**/*.css")
	.pipe(concat("app.css"))
	.pipe(minifycss())
	.pipe(gulp.dest("./build/css"));
})
gulp.task("createhtml",function() {
	gulp.src("./app/index.html")
	.pipe(inject(stream(bowerjs,js, tpl,css),{ignorePath:'/build'}))
	.pipe(gulp.dest("./build/"));
})

gulp.task("bowerjs",function() {
	bowerjs = gulp.src("./bower.json")
	.pipe(mainbower())
	.pipe(filter("**/*.js"))
	.pipe(concat("vendor.js"))
	.pipe(uglify())	
	.pipe(gulp.dest("./build/js"));
})
gulp.task("html",function() {
	gulp.src("./app/templates/**/*.html")
	.pipe(gulp.dest("./build/templates"));
})
gulp.task("cachetpl",function() {
	tpl = gulp.src("./app/templates/**/*.html")
	.pipe(cachetpl('template.js',{module:'brainvizApp'}))
	.pipe(gulp.dest("./build/js"));
})
gulp.task("connect",function(){
	connect.server({
		port:8880,
		root:"./build"
	})
})

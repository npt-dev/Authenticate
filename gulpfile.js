const gulp = require("gulp");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const paths = {
    "bower_components": ["bower_components/angular/angular.min.js",
        "bower_components/angular-messages/angular-messages.min.js",
        "bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "bower_components/ngstorage/ngStorage.min.js",
        "bower_components/angular-mocks/angular-mocks.js",
        "app.js", "app/services/*.js", "app/helpers/*.js", "app/controllers/*.js"]
};

gulp.task("default", function() {
    return gulp.src(paths["bower_components"])
        .pipe(sourcemaps.init())
        .pipe(concat("requireJS.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("."));
});

// process JS files and return the stream.
gulp.task("js", function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Static server
gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", reload);
});
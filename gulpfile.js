const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('strip-code', function() {
  return gulp.src('src/**/*.ts') // Adjust the glob pattern to match your files
    .pipe(replace(/\/\/ START_REMOVE[\s\S]*?\/\/ END_REMOVE/g, ''))
    .pipe(gulp.dest('build'));
});

gulp.task('default', gulp.series('strip-code'));
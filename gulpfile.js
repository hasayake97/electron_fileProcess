const gulp = require('gulp')
let electron = require('electron-connect').server.create()

gulp.task('watch:electron', () => {
  electron.start()
  gulp.watch(['./*.js'], electron.restart);
  gulp.watch(['./*.{html,js,css}'], electron.reload);
})
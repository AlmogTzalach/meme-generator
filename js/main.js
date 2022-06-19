'use strict'

function onInit() {
  renderGallery()
  renderSearchWords()
}

function toggleMenu() {
  if (document.body.clientWidth > 840) return
  document.querySelector('.main-nav').classList.toggle('show')
  document.querySelector('.menu-toggle').classList.toggle('change')
  document.body.classList.toggle('screen-open')
}

function showSnackbar() {
  // Get the snackbar DIV
  var elSnackbar = document.querySelector('.snackbar')

  // Add the "show" class to DIV
  elSnackbar.classList.add('show')

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    elSnackbar.classList.remove('show')
  }, 2700)
}

function toggleMoreTags(elBtn) {
  const elMoreTags = document.querySelector('.more-tags')
  elMoreTags.classList.toggle('open')
  elMoreTags.classList.toggle('close')
  // elMoreTags.classList.toggle('grid')
  elBtn.classList.toggle('rotate')
}

function toggleScreen() {
  document.body.classList.toggle('screen-open')
  document.querySelector('.modal').style.display = 'none'
  const elNav = document.querySelector('.main-nav')
  if (elNav.classList.contains('show')) {
    document.querySelector('.main-nav').classList.toggle('show')
    document.querySelector('.menu-toggle').classList.toggle('change')
  }
}

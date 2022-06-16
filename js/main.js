'use strict'

function onInit() {
  renderGallery()
}

function toggleMenu() {
  if (document.body.clientWidth > 840) return
  document.querySelector('.main-nav').classList.toggle('show')
  document.querySelector('.menu-toggle').classList.toggle('change')
  document.body.classList.toggle('screen-open')
}

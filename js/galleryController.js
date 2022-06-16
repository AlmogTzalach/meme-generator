'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImgs = [
  { id: 1, url: 'images/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
  { id: 2, url: 'images/meme-imgs (square)/2.jpg', keywords: ['funny', 'cat'] },
  { id: 3, url: 'images/meme-imgs (square)/3.jpg', keywords: ['funny', 'cat'] },
  { id: 4, url: 'images/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },
  { id: 5, url: 'images/meme-imgs (square)/5.jpg', keywords: ['funny', 'cat'] },
  { id: 6, url: 'images/meme-imgs (square)/6.jpg', keywords: ['funny', 'cat'] },
  { id: 7, url: 'images/meme-imgs (square)/7.jpg', keywords: ['funny', 'cat'] },
  { id: 8, url: 'images/meme-imgs (square)/8.jpg', keywords: ['funny', 'cat'] },
  { id: 9, url: 'images/meme-imgs (square)/9.jpg', keywords: ['funny', 'cat'] },
  {
    id: 10,
    url: 'images/meme-imgs (square)/10.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 11,
    url: 'images/meme-imgs (square)/11.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 12,
    url: 'images/meme-imgs (square)/12.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 13,
    url: 'images/meme-imgs (square)/13.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 14,
    url: 'images/meme-imgs (square)/14.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 15,
    url: 'images/meme-imgs (square)/15.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 16,
    url: 'images/meme-imgs (square)/16.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 17,
    url: 'images/meme-imgs (square)/17.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 18,
    url: 'images/meme-imgs (square)/18.jpg',
    keywords: ['funny', 'cat'],
  },
]

function renderGallery() {
  const elGallery = document.querySelector('.gallery')
  let strHTML = ''
  gImgs.forEach(
    (img) =>
      (strHTML += `<div class="meme-image">
                         <img onclick="onMemeClicked(${img.id})" src="${img.url}"/>
                    </div>`)
  )

  elGallery.innerHTML = strHTML
}

function renderSavedMemes() {
  const elGallery = document.querySelector('.gallery')
  const savedMemes = getSavedMemes()
  if (savedMemes.length === 0) {
    elGallery.innerText = 'No Saved Memes'
    return
  }
  let strHTML = ''
  savedMemes.forEach(
    (meme) =>
      (strHTML += `<div class="meme-image">
                         <img onclick="onMemeClicked(${meme.selectedImgId})" src="${meme.url}"/>
                    </div>`)
  )

  elGallery.innerHTML = strHTML
}

function onMemeClicked(imgId) {
  setMeme(imgId)
  getCanvas()
  showEditor()
  clearCanvas()
  renderMeme()
  hideGallery()
  addListeners()
}

function getImages() {
  return gImgs
}

function hideGallery() {
  const elGallery = document.querySelector('.gallery')
  elGallery.classList.add('hide')
}

function showGallery() {
  const elGallery = document.querySelector('.gallery')
  elGallery.classList.remove('hide')
}

function showEditor() {
  const elEditor = document.querySelector('.meme-editor')
  elEditor.classList.remove('hide')
}

function hideEditor() {
  const elEditor = document.querySelector('.meme-editor')
  elEditor.classList.add('hide')
}

function resetGallery(show) {
  if (show === 'showSaved') renderSavedMemes()
  else renderGallery()
  showGallery()
  hideEditor()
  toggleMenu()
}

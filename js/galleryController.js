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

function onMemeClicked(imgId) {
  setMeme(imgId)
  getCanvas()
  renderEditor()
  clearCanvas()
  renderMeme()
  addListeners()
}

function getImages() {
    return gImgs
}
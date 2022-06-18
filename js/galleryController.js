'use strict'

function onSetFilterByText(value) {
  setFilterBy(value)
}

function onSetFilterByWord(value) {
  const SearchCountMap = getSearchCount()
  const searchWord = value.toLowerCase()
  if (SearchCountMap[searchWord] < 20) SearchCountMap[searchWord]++

  const elInput = document.querySelector('.filter-list')
  elInput.value = value
  setFilterBy(value)
  renderSearchWords()
}

function renderGallery() {
  const elGallery = document.querySelector('.gallery')
  const filter = getFilterBy()
  let imgs = getImgs()
  if (filter)
    imgs = imgs.filter((img) =>
      img.keywords.some((word) =>
        word.toLowerCase().includes(filter.toLowerCase())
      )
    )

  let strHTML = ''
  imgs.forEach(
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

function renderSearchWords() {
  const elTagsHolder = document.querySelector('.tags')
  const elMoreTags = document.querySelector('.more-tags')
  const searchWordsMap = getSearchCount()
  const tagNames = Object.keys(searchWordsMap)
  let strHTML = ''

  const strHTMLs = tagNames.map((tag) => {
    let count = searchWordsMap[tag]
    return `<a
    href="#"
    style="font-size:${15 + count * 1.2}px ;"
    class="search-tag"
    onclick="onSetFilterByWord(this.innerText)"
    >${tag}</a
  >`
  })

  for (let i = 0; i < 4; i++) {
    strHTML += strHTMLs[i]
  }
  elTagsHolder.innerHTML = strHTML

  strHTML = ''

  for (let i = 4; i < strHTMLs.length; i++) {
    strHTML += strHTMLs[i]
  }
  elMoreTags.innerHTML = strHTML
}

function onMemeClicked(imgId) {
  setMeme(imgId)
  getCanvas()
  showEditor()
  clearCanvas()
  renderMeme()
  hideGallery()
  hideSearch()
  addListeners()
}

function hideGallery() {
  const elGallery = document.querySelector('.gallery')
  elGallery.classList.add('hide')
}

function hideSearch() {
  const elSearchBar = document.querySelector('.search-container')
  elSearchBar.classList.add('hide')
}

function showGallery() {
  const elGallery = document.querySelector('.gallery')
  elGallery.classList.remove('hide')
}

function showSearch() {
  const elSearchBar = document.querySelector('.search-container')
  elSearchBar.classList.remove('hide')
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
  if (show === 'showSaved') {
    renderSavedMemes()
    hideSearch()
  } else {
    renderGallery()
    showSearch()
  }
  hideAboutSection()
  hideEditor()
  showGallery()
  toggleMenu()
}

function onAboutClick() {
  hideEditor()
  hideGallery()
  hideSearch()
  showAboutSection()
}

function showAboutSection() {
  const elAboutSection = document.querySelector('.about-section')
  elAboutSection.classList.remove('hide')
}

function hideAboutSection() {
  const elAboutSection = document.querySelector('.about-section')
  elAboutSection.classList.add('hide')
}

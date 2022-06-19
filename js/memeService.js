'use strict'

const STORAGE_KEY = 'savedMemes'

var gCurrFont = 'Impact'
var gCurrAlign = 'right'
var gCurrSize = 30
var gCurrStroke = 'black'
var gCurrColor = 'black'

var gSavedMemes

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [_createLine()],
}

function saveMeme() {
  const savedMemes = getSavedMemes()
  const currMeme = { ...getMeme() }
  currMeme.url = gElCanvas.toDataURL()
  savedMemes.push(currMeme)
  gSavedMemes = savedMemes
  saveMemes()
  showSnackbar()
}

function downloadMeme(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function getSavedMemes() {
  gSavedMemes = loadFromStorage(STORAGE_KEY)
  if (gSavedMemes === null) gSavedMemes = []
  return gSavedMemes
}

function saveMemes() {
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function getMeme() {
  return gMeme
}

function setMeme(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineText(elInput) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  if (line === undefined) return
  line.txt = elInput.value
}

function addNewLine() {
  const meme = getMeme()
  setRectColor('rgba(0,0,0,0)')
  meme.lines.push(_createLine())
  meme.selectedLineIdx = meme.lines.length - 1
}

function changeLineIdx() {
  const meme = getMeme()
  setRectColor('rgba(0,0,0,0)')
  if (meme.selectedLineIdx >= meme.lines.length - 1) meme.selectedLineIdx = 0
  else meme.selectedLineIdx++
  setRectColor('black')
}

function removeLine() {
  const meme = getMeme()
  meme.lines.splice(meme.selectedLineIdx, 1)
  changeLineIdx()
}

function incFontSize() {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.size++
  gCurrSize = line.size
}

function decFontSize() {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.size--
  gCurrSize = line.size
}

function setFont(font) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.font = font
  gCurrFont = font
}

function setAlign(align) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.align = align
  gCurrAlign = align
}

function setStrokeClr(color) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.strokeClr = color
  gCurrStroke = color
}

function setFillClr(color) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.color = color
  gCurrColor = color
}

function getFont() {
  return gCurrFont
}

function getAlign() {
  return gCurrAlign
}

function getFontSize() {
  return gCurrSize
}

function getStrokeClr() {
  return gCurrStroke
}

function getFillClr() {
  return gCurrColor
}

function _createLine() {
  return {
    txt: 'Your text here',
    size: getFontSize(),
    font: getFont(),
    align: getAlign(),
    color: getFillClr(),
    strokeClr: getStrokeClr(),
    linePos: { x: 250, y: 50 },
    isDrag: false,
    rectColor: 'black',
  }
}

function setRectColor(color) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  if (line === undefined) return
  line.rectColor = color
}

// function clearRect() {
//   const meme = getMeme()
//   const line = meme.lines[meme.selectedLineIdx]
//   const { x, y, w, h } = line.rectPos
//   gCtx.clearRect(x, y, w, h)
// }

function setTextInput(clickedText) {
  const elInput = document.querySelector('.text-editor')
  if (clickedText) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    elInput.value = line.txt
  } else {
    elInput.value = ''
  }
}

//Check if the click is inside the rectangle
function isRectClicked(clickedPos) {
  const meme = getMeme()
  let isClicked = false
  let lineToMove = null
  // const line = meme.lines[meme.selectedLineIdx]
  meme.lines.forEach((line, lineIdx) => {
    const { x, y, w, h } = line.rectPos
    if (
      x > clickedPos.x ||
      y > clickedPos.y ||
      x + w < clickedPos.x ||
      y + h < clickedPos.y
    ) {
      meme.selectedLineIdx = lineIdx
      setRectColor('rgba(0,0,0,0)')
      setTextInput(false)
      renderMeme()
    } else {
      meme.selectedLineIdx = lineIdx
      lineToMove = lineIdx
      isClicked = true
    }
  })
  meme.lines.forEach((line, lineIdx) => {
    meme.selectedLineIdx = lineIdx
    if (lineIdx === lineToMove) {
      setTextInput(true)
      setRectColor('black')
    } else setRectColor('rgba(0,0,0,0)')
  })
  meme.selectedLineIdx = lineToMove
  return isClicked
}

// //Check if the click is inside the rectangle
// function isRectClicked(clickedPos) {
//   const meme = getMeme()
//   let isClicked = false
//   let lineToMove = 0
//   // const line = meme.lines[meme.selectedLineIdx]
//   meme.lines.forEach((line, lineIdx) => {
//     const { x, y, w, h } = line.rectPos
//     if (
//       x > clickedPos.x ||
//       y > clickedPos.y ||
//       x + w < clickedPos.x ||
//       y + h < clickedPos.y
//     ) {
//       meme.selectedLineIdx = lineIdx
//       setRectColor('rgba(0,0,0,0)')
//       setTextInput(false)
//       renderMeme()
//     } else {
//       lineToMove = lineIdx
//       meme.selectedLineIdx = lineIdx
//       setRectColor('black')
//       setTextInput(true)
//       isClicked = true
//     }
//   })
//   meme.selectedLineIdx = lineToMove
//   return isClicked
// }

function setRectDrag(isDrag) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  if (line === undefined) return
  line.isDrag = isDrag
}

function moveRect(dx, dy) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.linePos.x += dx
  line.linePos.y += dy
}

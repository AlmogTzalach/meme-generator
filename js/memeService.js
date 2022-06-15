'use strict'

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 40,
      font: 'Impact',
      align: 'center',
      color: 'red',
      linePos: { x: 250, y: 50 },
      isDrag: false,
    },
  ],
}

function getMeme() {
  return gMeme
}

function setMeme(imgId) {
  gMeme.selectedImgId = imgId
}

//Check if the click is inside the rectangle
function isRectClicked(clickedPos) {
  const meme = getMeme()
  const line = meme.lines[0]
  const { x, y, w, h } = line.rectPos
  if (x > clickedPos.x) return false
  if (y > clickedPos.y) return false
  if (x + w < clickedPos.x) return false
  if (y + h < clickedPos.y) return false
  return true
}

function setRectDrag(isDrag) {
  gMeme.lines[0].isDrag = isDrag
}

//Move the circle in a delta, diff from the pervious pos
function moveRect(dx, dy) {
  const meme = getMeme()
  const line = meme.lines[0]
  line.linePos.x += dx
  line.linePos.y += dy
}

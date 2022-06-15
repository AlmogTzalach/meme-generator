'use strict'

var gElCanvas
var gCtx
var imgWidth
var imgHeight
var gStartPos

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function renderEditor() {
  const elEditor = document.querySelector('.meme-editor')
  elEditor.classList.remove('hide')
}

function getCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
}

function clearCanvas() {
  gCtx.clearRect(0, 0, 500, 500)
}

function renderMeme() {
  const meme = getMeme()
  const imgs = getImages()
  // gCtx.clearRect(0, 0, 500, 500)
  const img = new Image()
  img.onload = () => {
    gCtx.drawImage(img, 0, 0)
    const line = meme.lines[0]
    const { x, y } = line.linePos
    gCtx.textAlign = line.align
    gCtx.font = line.size + 'px ' + line.font
    gCtx.fillStyle = line.color
    const txtWidth = gCtx.measureText(line.txt).width
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeRect(
      x - txtWidth / 2 - 10,
      y - line.size,
      txtWidth + 20,
      line.size + 10
    )
    line.rectPos = {
      x: x - txtWidth / 2 - 10,
      y: y - line.size,
      w: txtWidth + 20,
      h: line.size + 10,
    }
  }
  const currImg = imgs.find((img) => {
    if (img.id === meme.selectedImgId) return img
  })
  img.src = currImg.url
}

// function renderMeme(elImg) {
//     gCtx.clearRect(0, 0, 500, 500)
//   const img = new Image()
//   img.onload = function () {
//     // imgWidth = this.width
//     // imgHeight = this.height
//     gCtx.drawImage(img, 0, 0)
//   }
//   //   gElCanvas.width = imgWidth
//   //   gElCanvas.height = imgHeight
//   img.src = elImg.src
//   //   gCtx.drawImage(img, imgWidth, imgHeight)
// }

//Handle the listeners
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  //Listen for resize ev
  window.addEventListener('resize', () => {
    resizeCanvas()
    renderCanvas()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  //Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  if (!isRectClicked(pos)) return
  setRectDrag(true)
  //Save the pos we start from
  gStartPos = pos
  gElCanvas.style.cursor = 'grabbing'
}

function onMove(ev) {
  const meme = getMeme()
  const line = meme.lines[0]
  if (line.isDrag) {
    const pos = getEvPos(ev)
    //Calc the delta , the diff we moved
    const dx = pos.x - line.linePos.x
    const dy = pos.y - line.linePos.y
    moveRect(dx, dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    //The canvas is render again after every move
    renderMeme()
  }
}

function onUp() {
  setRectDrag(false)
  gElCanvas.style.cursor = 'grab'
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
  //Gets the offset pos , the default pos
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (gTouchEvs.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

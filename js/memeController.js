'use strict'

var gElCanvas
var gCtx
var imgWidth
var imgHeight
var gStartPos

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function openModal() {
  document.querySelector('.modal').style.display = 'flex'
  document.body.classList.toggle('screen-open')
}

function closeModal() {
  document.querySelector('.modal').style.display = 'none'
  document.body.classList.toggle('screen-open')
}

function onShareMeme() {
  setRectColor('rgba(0,0,0,0)')
  renderMeme()
  uploadImg()
  openModal()
}

function onTextTyped(elInput) {
  setLineText(elInput)
  renderMeme()
}

function onAddLine() {
  addNewLine()
  renderMeme()
}

function onChangeLine() {
  changeLineIdx()
  renderMeme()
}

function onRemoveLine() {
  removeLine()
  renderMeme()
}

function onIncFont() {
  incFontSize()
  renderMeme()
}

function onDecFont() {
  decFontSize()
  renderMeme()
}

function onSelectFont(font) {
  setFont(font)
  renderMeme()
}

function onSetAlign(align) {
  setAlign(align)
  renderMeme()
}

function onSelectStroke(color) {
  setStrokeClr(color)
  renderMeme()
}

function onSelectFill(color) {
  setFillClr(color)
  renderMeme()
}

function onSaveMeme() {
  saveMeme()
}

function onDownloadMeme(elLink) {
  downloadMeme(elLink)
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
  const imgs = getImgs()
  // gCtx.clearRect(0, 0, 500, 500)s
  const img = new Image()
  img.onload = () => {
    if (document.body.clientWidth < 640) {
      gElCanvas.width = 350
      gElCanvas.height = (img.height * 350) / img.width
    }
    if (document.body.clientWidth > 840) {
      gElCanvas.width = 400
      gElCanvas.height = (img.height * 400) / img.width
    }
    if (document.body.clientWidth > 1100) {
      gElCanvas.width = 500
      gElCanvas.height = (img.height * 500) / img.width
    }

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line) => {
      const { x, y } = line.linePos
      gCtx.textAlign = line.align
      gCtx.font = line.size + 'px ' + line.font
      gCtx.fillStyle = line.color
      const txtWidth = gCtx.measureText(line.txt).width
      gCtx.strokeStyle = line.strokeClr
      gCtx.strokeText(line.txt, x, y)
      gCtx.fillText(line.txt, x, y)
      gCtx.strokeStyle = line.rectColor
      gCtx.strokeRect(x - txtWidth, y - line.size, txtWidth * 2, line.size + 10)
      line.rectPos = {
        x: x - txtWidth,
        y: y - line.size,
        w: txtWidth * 2,
        h: line.size + 10,
      }
    })
  }
  const currImg = imgs.find((img) => {
    if (img.id === meme.selectedImgId) return img
  })
  img.src = currImg.url
}

function renderRect() {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  if (line === undefined) return
  const { x, y, w, h } = line.rectPos
  gCtx.strokeStyle = line.rectColor
  gCtx.strokeRect(x, y, w, h)
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
  // Listen for resize ev
  // window.addEventListener('resize', () => {
  //   resizeCanvas()
  // })
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
  renderRect()
  setRectDrag(true)
  //Save the pos we start from
  gStartPos = pos
  gElCanvas.style.cursor = 'grabbing'
}

function onMove(ev) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  if (line === undefined) return
  if (line.isDrag) {
    const pos = getEvPos(ev)
    //Calc the delta , the diff we moved
    const dx = pos.x - line.linePos.x
    const dy = pos.y - line.linePos.y
    moveRect(dx, dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    //The canvas is render again after every move
    renderRect()
    renderMeme()
  }
}

function onUp() {
  setRectDrag(false)
  renderRect()
  gElCanvas.style.cursor = 'grab'
}

// function resizeCanvas() {
//   const elContainer = document.querySelector('.canvas-container')
//   gElCanvas.width = elContainer.offsetWidth
//   gElCanvas.height = elContainer.offsetHeight
// }

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

'use strict'

function uploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    //Encode the instance of certain characters in the url
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    //Create a link that on click will make a post in facebook with the image we uploaded
    const elFacebookLink = document.querySelector('.fa-facebook')
    elFacebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    elFacebookLink.onclick = `window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;`
  }
  //Send the image to the server
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  //Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)
  //Send a post req with the image to the server
  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  }) //Gets the result and extract the text/ url from it
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url)
      //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}

async function shareCanvas() {
  const canvasElement = document.querySelector('canvas')
  const dataUrl = canvasElement.toDataURL()
  const blob = await (await fetch(dataUrl)).blob()
  const filesArray = [
    new File([blob], 'animation.png', {
      type: blob.type,
      lastModified: new Date().getTime(),
    }),
  ]
  const shareData = {
    files: filesArray,
  }
  navigator.share(shareData)
}

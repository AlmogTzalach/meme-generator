'use strict'

var gFilterBy = ''

var gKeywordSearchCountMap = {
  funny: 12,
  cat: 16,
  baby: 4,
  dog: 3,
  cute: 5,
  weird: 11,
  question: 17,
  trump: 3,
  obama: 7,
  diCaprio: 6,
  putin: 9,
  oprah: 20,
}

var gImgs = [
  {
    id: 1,
    url: 'images/meme-imgs/1.jpg',
    keywords: ['funny', 'Trump'],
  },
  { id: 2, url: 'images/meme-imgs/2.jpg', keywords: ['cute', 'dog'] },
  {
    id: 3,
    url: 'images/meme-imgs/3.jpg',
    keywords: ['cute', 'dog', 'baby'],
  },
  {
    id: 4,
    url: 'images/meme-imgs/4.jpg',
    keywords: ['cute', 'cat'],
  },
  { id: 5, url: 'images/meme-imgs/5.jpg', keywords: ['cute', 'baby'] },
  {
    id: 6,
    url: 'images/meme-imgs/6.jpg',
    keywords: ['funny', 'weird'],
  },
  {
    id: 7,
    url: 'images/meme-imgs/7.jpg',
    keywords: ['cute', 'baby'],
  },
  {
    id: 8,
    url: 'images/meme-imgs/8.jpg',
    keywords: ['funny', 'question'],
  },
  {
    id: 9,
    url: 'images/meme-imgs/9.jpg',
    keywords: ['funny', 'baby'],
  },
  {
    id: 10,
    url: 'images/meme-imgs/10.jpg',
    keywords: ['funny', 'Obama'],
  },
  {
    id: 11,
    url: 'images/meme-imgs/11.jpg',
    keywords: ['funny', 'weird'],
  },
  {
    id: 12,
    url: 'images/meme-imgs/12.jpg',
    keywords: ['question', 'funny'],
  },
  {
    id: 13,
    url: 'images/meme-imgs/13.jpg',
    keywords: ['question', 'Leonardo DiCaprio'],
  },
  {
    id: 14,
    url: 'images/meme-imgs/14.jpg',
    keywords: ['question'],
  },
  {
    id: 15,
    url: 'images/meme-imgs/15.jpg',
    keywords: ['funny', 'question'],
  },
  {
    id: 16,
    url: 'images/meme-imgs/16.jpg',
    keywords: ['funny', 'question'],
  },
  {
    id: 17,
    url: 'images/meme-imgs/17.jpg',
    keywords: ['funny', 'question', 'Vladimir Putin'],
  },
  {
    id: 18,
    url: 'images/meme-imgs/18.jpg',
    keywords: ['funny', 'question'],
  },
  {
    id: 19,
    url: 'images/meme-imgs/19.jpg',
    keywords: ['funny', 'question'],
  },
  {
    id: 20,
    url: 'images/meme-imgs/20.jpg',
    keywords: ['funny', 'cute'],
  },
  {
    id: 21,
    url: 'images/meme-imgs/21.jpg',
    keywords: ['funny', 'question'],
  },
  {
    id: 22,
    url: 'images/meme-imgs/22.jpg',
    keywords: ['funny', 'cute'],
  },
  {
    id: 23,
    url: 'images/meme-imgs/23.jpg',
    keywords: ['funny', 'Trump'],
  },
  {
    id: 24,
    url: 'images/meme-imgs/24.jpg',
    keywords: ['funny', 'dog'],
  },
  {
    id: 25,
    url: 'images/meme-imgs/25.jpg',
    keywords: ['funny', 'question', 'Oprah'],
  },
  {
    id: 26,
    url: 'images/meme-imgs/26.jpg',
    keywords: ['funny'],
  },
  {
    id: 27,
    url: 'images/meme-imgs/27.jpg',
    keywords: ['funny', 'weird'],
  },
  {
    id: 28,
    url: 'images/meme-imgs/28.jpg',
    keywords: ['funny', 'question'],
  },
  {
    id: 29,
    url: 'images/meme-imgs/29.jpg',
    keywords: ['funny', 'cute'],
  },
  {
    id: 30,
    url: 'images/meme-imgs/30.jpg',
    keywords: ['funny', 'question', 'cute'],
  },
  {
    id: 31,
    url: 'images/meme-imgs/31.jpg',
    keywords: ['funny', 'question'],
  },
  {
    id: 32,
    url: 'images/meme-imgs/32.jpg',
    keywords: ['funny', 'question', 'cute'],
  },
  {
    id: 33,
    url: 'images/meme-imgs/33.jpg',
    keywords: ['weird', 'question'],
  },
  {
    id: 34,
    url: 'images/meme-imgs/34.jpg',
    keywords: ['funny'],
  },
  {
    id: 35,
    url: 'images/meme-imgs/35.jpg',
    keywords: ['funny', 'cute'],
  },
]

function setFilterBy(value) {
  gFilterBy = value
  renderGallery()
}

function getFilterBy() {
  return gFilterBy
}

function getImgs() {
  return gImgs
}

function getSearchCount() {
  return gKeywordSearchCountMap
}

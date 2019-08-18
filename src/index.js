import  './styles/index.scss'
import Glide from '@glidejs/glide'

const defaultSettings = {
  type: 'slider',
  focusAt: 'center',
  gap: 0,
  dragThreshold: false,
  touchRatio: 1,
  touchAngle: 90,
  perView: 5
}
const glideClass = '.glide'
const slideClass = '.glide__slide'
const contentClass = '.glide__slide__content'
const sectionClass = 'section'
const contentCloneClassName = 'content'
const glide = new Glide(glideClass, defaultSettings)
const glideEl = document.querySelector(glideClass)
const sectionEl = document.querySelector(sectionClass)
const allSlidesEl = document.querySelectorAll(slideClass)
// const contentEl = document.createElement('section')

let inAction = false
let inDetails = null

allSlidesEl.forEach((slide, index) => {
  const content = slide.querySelector(contentClass)

  slide.addEventListener('click', e => {
    if (glide.index === index) {
      toggleDetails(index)
    } else {
      glide.go(`=${index}`)
    }
  })
})

glide.on('swipe.start', () => {
  if (!inAction) {
    inAction = true
    zoomOut()
  }
})

glide.on('swipe.end', () => {
  if (inAction) {
    inAction = false
    zoomIn()
  }
})

glide.on('run', () => {
  toggleDetails(glide.index)
})

glide.mount()

// --------------------------------

function zoomIn() {
  sectionEl.classList.remove('--swiping')
}

function zoomOut() {
  sectionEl.classList.add('--swiping')
}

function toggleDetails(index) {
  const slide = allSlidesEl[index]
  const content = slide.querySelector(contentClass)
  const prevContentEl = sectionEl.querySelector(`.${contentCloneClassName}`)

  if (prevContentEl) {
    prevContentEl.remove()
  }

  if (content) {
    const contentEl = content.cloneNode(true)

    if (inDetails === index) {
      sectionEl.classList.remove('--full-screen')
      inDetails = null
    } else {
      contentEl.className = contentCloneClassName
      sectionEl.insertAdjacentElement('beforeend', contentEl)
      sectionEl.classList.add('--full-screen')

      inDetails = index
    }
  } else {
    sectionEl.classList.remove('--full-screen')
    inDetails = index
  }
}
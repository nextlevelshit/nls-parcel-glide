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
const sectionClass = 'section'
const glide = new Glide(glideClass, defaultSettings)
const glideEl = document.querySelector(glideClass)
const sectionEl = document.querySelector(sectionClass)
const allSlidesEl = document.querySelectorAll(slideClass)

let inAction = false

allSlidesEl.forEach((slide, index) => {
  slide.addEventListener('click', e => {
    if (glide.index === index) {
      sectionEl.classList.toggle('--full-screen')
      if (glide.disabled) {
        glide.enable()
      } else {
        glide.disable()
      }
    } else {
      if (!glide.disabled) {
        glide.go(`=${index}`)
      }
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

// glide.on('run', (move) => {
//   console.log(move, glide.index)
// })

glide.mount()

// --------------------------------

function zoomIn() {
  sectionEl.classList.remove('--swiping')
}

function zoomOut() {
  sectionEl.classList.add('--swiping')
}
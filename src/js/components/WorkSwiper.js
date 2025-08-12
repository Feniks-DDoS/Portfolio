const rootSelector = `[data-js-work-swiper]`

class Swiper {
    selectors = {
        root: rootSelector,
        buttonPrev: `[data-js-swiper-button-prev]`,
        buttonNext: `[data-js-swiper-button-next]`,
        swiperDisply: `[data-js-work-swiper-display]`,
        swiperSlide: `[data-js-work-swiper-slide]`,
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonNextElement = this.rootElement.querySelectorAll(this.selectors.buttonNext)
        this.buttonPrevElement = this.rootElement.querySelectorAll(this.selectors.buttonPrev)
        this.swiperDisplayElement = this.rootElement.querySelector(this.selectors.swiperDisply)
        this.swiperSlideElements = this.rootElement.querySelectorAll(this.selectors.swiperSlide)

        this.currentIndex = 0
        this.total = this.swiperSlideElements.length

        this.bindEvents()
        this.updateUI()
    }

    goTo(index) {
        this.currentIndex = (index + this.total) % this.total;
        this.updateUI()
    }

    updateUI() {
        const offset = this.currentIndex * 100
        this.swiperSlideElements.forEach((element) => {
            element.style.transform = `translateX(-${offset}%)`
        })
    }

    onNextClick() {
        this.goTo(this.currentIndex + 1)
    }

    onPrevClick() {
        this.goTo(this.currentIndex - 1)
    }

    bindEvents() {
        this.buttonNextElement.forEach((element) => {
            element.addEventListener('click', () => this.onNextClick())
        })
        this.buttonPrevElement.forEach((element) => {
            element.addEventListener('click', () => this.onPrevClick())
        })
    }
}

class SwiperCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Swiper(element)
        })
    }
}

export default SwiperCollection

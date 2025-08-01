const rootSelector = `[data-js-preloader]`

class Preloader {

    selectors = {
        root: rootSelector,
    }

    constructor(rootElement) {
        this.rootElement = rootElement

        this.preloaderCloseEvent = new Event('preloaderClose', { bubbles: true })
        this.bindEvents()
    }

    onAnimationEnd(event) {       
        if(event.animationName === 'fade-out-preloader') {
            this.rootElement.dispatchEvent(this.preloaderCloseEvent)
        }
    }

    bindEvents() {
        this.rootElement.addEventListener('animationend', (event) => this.onAnimationEnd(event))
    }

}

class PreloaderCollection {    
    constructor() {
        this.init()
        this.scrollToHeroSection()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Preloader(element)
        })
    }

    scrollToHeroSection() {
        const hero = document.querySelector('[data-js-header]')

        if(!hero) {
            this.onAnimationEnd()
            return
        }

        hero.scrollIntoView({behavior: 'smooth'})
    }
}

export default PreloaderCollection
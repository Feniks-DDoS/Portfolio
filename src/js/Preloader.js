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
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Preloader(element)
        })
}
}

export default PreloaderCollection
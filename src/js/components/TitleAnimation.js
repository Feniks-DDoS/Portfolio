const rootSelector = `[data-js-hero]`

class TitleAnimation {

    selectors = {
        root: rootSelector,
        title: `[data-js-hero-title]`,
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.titleElement = this.rootElement.querySelector(this.selectors.title)

        this.titleText = 'developer'
        this.index = 0

        this.showTitle = this.showTitle.bind(this)
        this.bindEvents()
    }

    showTitle() {
        if (this.index < this.titleText.length) {
            this.titleElement.textContent += this.titleText.charAt(this.index)
            this.index++
            setTimeout(this.showTitle, 150)
        }
    }

    bindEvents() {
        document.addEventListener('preloaderClose', () => {
            this.showTitle()
        })
    }
}

class TitleAnimationCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new TitleAnimation(element)
        })
    }
}

export default TitleAnimationCollection

const rootSelector = `[data-js-hero]`

class HeroBodyAnimation {

    selectors = {
        root: rootSelector,
        heroBody: `[data-js-hero-body-animation]`,
    }

    stateClasses = {
        fadeOut: 'fade-out',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.heroBodyElement = this.rootElement.querySelector(this.selectors.heroBody)

        this.observer()
    }

    observer() {
        const newObserver = new IntersectionObserver(([entry]) => {
            if(!entry.isIntersecting) {
                this.heroBodyElement.classList.add(this.stateClasses.fadeOut)
            }else {
                this.heroBodyElement.classList.remove(this.stateClasses.fadeOut)
            }
        }, {
            threshold: 0.1
        })

        newObserver.observe(this.heroBodyElement)
    }

}

class HeroBodyAnimationCollection {
        constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new HeroBodyAnimation(element)
        })
}
}

export default HeroBodyAnimationCollection
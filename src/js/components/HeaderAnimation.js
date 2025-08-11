const rootSelector = `[data-js-page-body]`

class HeaderAnimation {

    selectors = {
        root: rootSelector,
        header: `[data-js-header]`,      
    }

    stateClasses = {
        isAnimated: 'animated',
        isActive: 'is-active'
    }

    scroll = {
        scrollTrigger: 50
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.headerElement = this.rootElement.querySelector(this.selectors.header)

        this.scrollTrigger = this.scroll.scrollTrigger || 50
        this.init()
    }

    init() {
    window.addEventListener('scroll', () => this.handleScroll());
    }

 

    handleScroll() {

        if(window.scrollY > this.scrollTrigger) {
            this.headerElement.classList.add(this.stateClasses.isAnimated);
        } else {
            this.headerElement.classList.remove(this.stateClasses.isAnimated);
        }
    }
}

class HeaderAnimationCollection {        
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new HeaderAnimation(element)
        })
}

}

export default HeaderAnimationCollection
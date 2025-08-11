const rootSelector = `[data-js-page-body]`

class BurgerButton {

    selectors = {
        root: rootSelector,
        burgerButton: `[data-js-header-burger-button]`,
        overlayLink: `[data-js-overlay-link]`,
        overlayMenu: `[data-js-overlay-menu]`,
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
        this.overlayMenuElement = this.rootElement.querySelector(this.selectors.overlayMenu)
        this.overlayLinkElements = this.rootElement.querySelectorAll(this.selectors.overlayLink)

        this.bindEvents()
    }

    onClick() {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
        this.overlayMenuElement.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)
    }

    onClickLink(e) {
        this.burgerButtonElement.classList.remove(this.stateClasses.isActive)
        this.overlayMenuElement.classList.remove(this.stateClasses.isActive)
        document.documentElement.classList.remove(this.stateClasses.isLock)
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click' , () => this.onClick())
        this.overlayLinkElements.forEach((e) => {
            e.addEventListener('click' , (e) => this.onClickLink(e))
        })
    }
}

class BurgerButtonCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new BurgerButton(element)
        })
    }
}

export default BurgerButtonCollection
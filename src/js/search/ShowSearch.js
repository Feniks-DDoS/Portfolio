import MatchMedia from '../utils/MatchMedia.js'

const rootSelector = `[data-js-search-form]`

class ShowSeacrh {

    selectors = {
        root: rootSelector,
        showButton: `[data-js-show-hide-search]`,
        closeButton: `[data-js-close-hide-search]`,
        seacrhDisplay: `[data-js-search-display]`,
    }

    stateClasses = {
        isActive: 'is-active',
        isHide: 'is-hide',
        isLock: 'is-lock',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.showButtonElement = this.rootElement.querySelector(this.selectors.showButton)
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)
        this.seacrhDisplayElement = this.rootElement.querySelector(this.selectors.seacrhDisplay)

        this.bindEvents()
    }

    onClickShowButton() {

        if(MatchMedia.mobile) {
        this.showButtonElement.classList.add(this.stateClasses.isHide)
        this.closeButtonElement.classList.add(this.stateClasses.isActive)
        this.seacrhDisplayElement.classList.add(this.stateClasses.isActive)
        const controlElement = this.seacrhDisplayElement.querySelector('.field__control--drop')
        controlElement.focus()

        document.documentElement.classList.add(this.stateClasses.isLock)
        }
    }

    onClickCloseButton() {
        this.closeButtonElement.classList.remove(this.stateClasses.isActive)
        this.showButtonElement.classList.remove(this.stateClasses.isHide)
        this.seacrhDisplayElement.classList.remove(this.stateClasses.isActive)
        const controlElement = this.seacrhDisplayElement.querySelector('.field__control--drop')
        controlElement.value = ''

        document.documentElement.classList.remove(this.stateClasses.isLock)
    }

    onShowKeyDown(event) {
        const isShowElement = event.target.closest(this.selectors.showButton)
        const { code } = event

        if(code === 'Enter' && isShowElement) {
        this.showButtonElement.classList.add(this.stateClasses.isHide)
        this.closeButtonElement.classList.add(this.stateClasses.isActive)
        this.seacrhDisplayElement.classList.add(this.stateClasses.isActive)
        const controlElement = this.seacrhDisplayElement.querySelector('.field__control--drop')
        controlElement.focus()

        document.documentElement.classList.add(this.stateClasses.isLock)
        }
    }
     onCloseKeyDown(event) {
        const isCloseElement = event.target.closest(this.selectors.closeButton)
        const { code } = event

        if(code === 'Enter' && isCloseElement) {
        this.closeButtonElement.classList.remove(this.stateClasses.isActive)
        this.showButtonElement.classList.remove(this.stateClasses.isHide)
        this.seacrhDisplayElement.classList.remove(this.stateClasses.isActive)
        const controlElement = this.seacrhDisplayElement.querySelector('.field__control--drop')
        controlElement.value = ''

        document.documentElement.classList.remove(this.stateClasses.isLock)
        }
    }

    bindEvents() {
        this.showButtonElement.addEventListener('click' , () => this.onClickShowButton())
        this.closeButtonElement.addEventListener('click' , () => this.onClickCloseButton())
        this.showButtonElement.addEventListener('keydown' , (event) => this.onShowKeyDown(event))
        this.closeButtonElement.addEventListener('keydown' , (event) => this.onCloseKeyDown(event))
    }

}

class ShowSeacrhCollection {
     constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ShowSeacrh(element)
        })
}
}

export default ShowSeacrhCollection
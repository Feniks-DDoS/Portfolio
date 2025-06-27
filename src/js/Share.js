const rootSelector = `[data-js-share]`

class Share {

    selectors = {
        root: rootSelector,
        shareButton: `[data-js-share-button]`,
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.shareButtonElement = this.rootElement.querySelectorAll(this.selectors.shareButton)

        this.bindEvents()
    }

    onShareClick() {
        if(navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Look at what site',
                url: window.location.href,
            })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error when trying to share:', error))
        }else {
            alert('The "Share" function is not supported in this browser')
        }
    }

    bindEvents() {
        this.shareButtonElement.forEach((element) => {
            element.addEventListener('click' , () => this.onShareClick())
        })
    }

}

class ShareCollection {
         constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Share(element)
        })
    }
}

export default ShareCollection


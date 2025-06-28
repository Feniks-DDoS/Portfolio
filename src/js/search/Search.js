const rootSelector = `[data-js-page-body]`

class Search {

    selectors = {
        root: rootSelector,
        searchControl: `[data-js-search-control]`,
        searchItem: `[data-js="item"]`,        
        searchResults: `[data-js-search-results]`,
        closeButton: `[data-js-close-hide-search]`,
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.searchControlElement = this.rootElement.querySelectorAll(this.selectors.searchControl)
        this.searchItemElement = this.rootElement.querySelectorAll(this.selectors.searchItem)
        this.searchResultsElement = this.rootElement.querySelectorAll(this.selectors.searchResults)
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)
        this.bindEvents()
    }


    onInputSearch(event) {
        const searchValue = event.target.value.toLowerCase().trim()

        if(!searchValue) {
            this.clearResult()
            return
        }
        const matchedItem = Array.from(this.searchItemElement).filter(element => {  
            const name = element.getAttribute('data-name').toLowerCase()
            return name.includes(searchValue)
        })

        this.closeButtonElement.classList.add(this.stateClasses.isActive)
        document.documentElement.classList.remove(this.stateClasses.isLock)

        this.renderResult(matchedItem)
    }

    renderResult(item) {
        if(item.length === 0) {
            this.searchResultsElement.forEach(element => {
                element.innerHTML = `<p class="field__search-results-item">No results found</p>`
            })
            return
        }

        const listHTML = item.map(item => {
            const name = item.getAttribute('data-name')
            const id = item.getAttribute('id')
            const href = id ? `#${id}` : '#'
            return `<a href="${href}" class="field__search-results-item">${name}</a>`
        })
        .join("")

        this.searchResultsElement.forEach(element => {
            element.innerHTML = listHTML
        })
    }

    clearResult() {
        this.searchResultsElement.forEach(element => {
            element.innerHTML = ''
        })
        
    }

    onCloseClick() {
        this.closeButtonElement.classList.remove(this.stateClasses.isActive)
        const controlElement = this.rootElement.querySelector('.field__control')
        controlElement.value = ''
        this.clearResult()
    }

    bindEvents() {
        this.searchControlElement.forEach((element) => {
            element.addEventListener('input' ,  this.onInputSearch.bind(this))
        })
        this.closeButtonElement.addEventListener('click' , () => this.onCloseClick())
    }

}

class SearchCollection {
             constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Search(element)
        })
    }
}

export default SearchCollection
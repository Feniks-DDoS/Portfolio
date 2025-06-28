import MatchMedia from '../utils/MatchMedia.js'
const rootSelector = `[data-js-hero]`

class AsideChange {

    selectors = {
        root: rootSelector,
        asideLink: `[data-js-aside-link]`,
        homeLink: `[data-js-aside-home-link]`,
        aboutLink: `[data-js-aside-about-link]`,
        skillsLink: `[data-js-aside-skills-link]`,
        workLink: `[data-js-aside-works-link]`,
        blogLink: `[data-js-aside-blogs-link]`,
        contactLink: `[data-js-aside-contact-link]`,
    }

    stateClasses = {
        isActive: 'is-active',
    }

    stateAttribute = {
        ariaCurrent: 'aria-current'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.asideLinkElement = this.rootElement.querySelectorAll(this.selectors.asideLink)
        this.homeLinkElement = this.rootElement.querySelector(this.selectors.homeLink)
        this.aboutLinkElement = this.rootElement.querySelector(this.selectors.aboutLink)
        this.skillsLinkElement = this.rootElement.querySelector(this.selectors.skillsLink)
        this.workLinkElement = this.rootElement.querySelector(this.selectors.workLink)
        this.blogLinkElement = this.rootElement.querySelector(this.selectors.blogLink)
        this.contactLinkElement = this.rootElement.querySelector(this.selectors.contactLink)

        this.bindEvents()
    }

    onScroll() {
        const scrollHeight = window.scrollY


        this.asideLinkElement.forEach(element => {
            element.classList.remove(this.stateClasses.isActive)
            element.removeAttribute(this.stateAttribute.ariaCurrent)
        })

         if(scrollHeight <= 900) {
                this.homeLinkElement.classList.add(this.stateClasses.isActive)
                this.homeLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')      
            }else if(scrollHeight > 900 && scrollHeight <= 1932) {
                this.aboutLinkElement.classList.add(this.stateClasses.isActive)
                this.aboutLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }else if(scrollHeight > 1932 && scrollHeight <= 3100) {
                this.skillsLinkElement.classList.add(this.stateClasses.isActive)
                this.skillsLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }else if(scrollHeight > 3100 && scrollHeight <= 4300) {
                this.workLinkElement.classList.add(this.stateClasses.isActive)
                this.workLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }else if(scrollHeight > 4300 && scrollHeight <= 5500) {
                this.blogLinkElement.classList.add(this.stateClasses.isActive)
                this.blogLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }else if(scrollHeight > 5500 && scrollHeight <= 6400) {
                this.contactLinkElement.classList.add(this.stateClasses.isActive)
                this.contactLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }


        if(MatchMedia.laptop) {

        this.asideLinkElement.forEach(element => {
            element.classList.remove(this.stateClasses.isActive)
            element.removeAttribute(this.stateAttribute.ariaCurrent)
        })

            if(scrollHeight <= 1100) {
                this.homeLinkElement.classList.add(this.stateClasses.isActive)
                this.homeLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')      
            }else if(scrollHeight > 1100 && scrollHeight <= 2729) {
                this.aboutLinkElement.classList.add(this.stateClasses.isActive)
                this.aboutLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }else if(scrollHeight > 2729 && scrollHeight <= 4129) {
                this.skillsLinkElement.classList.add(this.stateClasses.isActive)
                this.skillsLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }else if(scrollHeight > 4129 && scrollHeight <= 4930) {
                this.workLinkElement.classList.add(this.stateClasses.isActive)
                this.workLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }else if(scrollHeight > 4930 && scrollHeight <= 5983) {
                this.blogLinkElement.classList.add(this.stateClasses.isActive)
                this.blogLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }else if(scrollHeight > 5983 && scrollHeight <= 7000) {
                this.contactLinkElement.classList.add(this.stateClasses.isActive)
                this.contactLinkElement.setAttribute(this.stateAttribute.ariaCurrent , 'page')
            }
        }
    }

    onClick(event) {
        const isAsideLink = event.currentTarget 

        if(!isAsideLink) return

        this.asideLinkElement.forEach(element => {
            element.classList.remove(this.stateClasses.isActive)
            element.removeAttribute(this.stateAttribute.ariaCurrent)
        })

        isAsideLink.classList.add(this.stateClasses.isActive)
        isAsideLink.setAttribute(this.stateAttribute.ariaCurrent , 'page')
    }

    bindEvents() {
        this.asideLinkElement.forEach((element) => {
            element.addEventListener('click' , (event) => this.onClick(event))
        })
        window.addEventListener('scroll', () => this.onScroll())
    }

}

class AsideChangeCollection {
        constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new AsideChange(element)
        })
}
}

export default AsideChangeCollection
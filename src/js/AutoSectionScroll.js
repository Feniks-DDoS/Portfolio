import MatchMedia from './MatchMedia.js'

const rootSelector = `[data-js-page-body]`;

class AutoScroll {
    selectors = {
        root: rootSelector,
        section: `[data-js-section]`,
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.sections = this.rootElement.querySelectorAll(this.selectors.section);
        this.isScrolling = false;
        this.lastScrollY = window.scrollY;
        this.userInitiatedScroll = false;

        this.initObserver();
        this.listenToScroll();
        this.listenToAnchors();
    }

    listenToScroll() {
        window.addEventListener('scroll', () => {
            this.scrollDirection = window.scrollY > this.lastScrollY ? 'down' : 'up';
            this.lastScrollY = window.scrollY;
        });
    }

    listenToAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                this.userInitiatedScroll = true;
                setTimeout(() => {
                    this.userInitiatedScroll = false;
                }, 2500); 
            });
        });
    }

    scrolltoWithOffset(element, offset = 300) {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementTop + offset,
            behavior: 'smooth',
        });
    }

    initObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (
                    entry.intersectionRatio > 0.2 &&
                    !this.isScrolling &&
                    this.scrollDirection === 'down' &&
                    !this.userInitiatedScroll &&
                    entry.target !== this.lastScrolledSection
                ) {
                    this.isScrolling = true;

                    this.scrolltoWithOffset(entry.target, 300);

                    setTimeout(() => {
                        this.isScrolling = false;
                    }, 500);
                }
            });
        }, {
            threshold: [0.2]
        });

        this.sections.forEach((section) => observer.observe(section));
    }
}

class AutoScrollCollection {
    constructor() {
        this.init();
    }

    init() {


        if (MatchMedia.tablet) return

        document.querySelectorAll(rootSelector).forEach((element) => {
            new AutoScroll(element);
        });
    }
}

export default AutoScrollCollection;

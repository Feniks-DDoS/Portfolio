class GoToTop {

    stateClasses = {
        animate: 'animate',
        skillItem: 'skills__item'
    }


    constructor() {
         this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(this.stateClasses.animate)
                }
            })
        }, { threshold: 0.7 })

        this.items = document.querySelectorAll(`.${this.stateClasses.skillItem}`)
        this.items.forEach(item => this.observer.observe(item))
    }
}

export default GoToTop
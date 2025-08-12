const rootSelector = `[data-js-page-body]`;

class Cursor {
    selectors = {
        cursor: `[data-js-cursor]`,
        aura: `[data-js-aura]`,
    }

    stateClasses = {
        isHovered: 'hovered'
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.cursorElement = this.rootElement.querySelector(this.selectors.cursor);
        this.auraElement = this.rootElement.querySelector(this.selectors.aura);
        this.linkElements = document.querySelectorAll('a')
        this.buttonElements = document.querySelectorAll('button')

        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.auraX = 0;
        this.auraY = 0;

        this.bindEvents();
        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) / 2;
        this.cursorY += (this.mouseY - this.cursorY) / 2;
        this.cursorElement.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px) translate(-50%, -50%)`;

        this.auraX += (this.mouseX - this.auraX) / 8;
        this.auraY += (this.mouseY - this.auraY) / 8;
        this.auraElement.style.transform = `translate(${this.auraX}px, ${this.auraY}px) translate(-50%, -50%)`;

        requestAnimationFrame(this.animate);
    }

    onPointerMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    bindEvents() {
        document.addEventListener('pointermove', (e) => this.onPointerMove(e));
        this.linkElements.forEach((link) => {
            link.addEventListener('pointerenter' , () => {                
            this.cursorElement.classList.add(this.stateClasses.isHovered);
            this.auraElement.classList.add(this.stateClasses.isHovered);
            }),
            link.addEventListener('pointerleave' , () => {                
            this.cursorElement.classList.remove(this.stateClasses.isHovered);
            this.auraElement.classList.remove(this.stateClasses.isHovered);
            })
        })       
         this.buttonElements.forEach((button) => {
            button.addEventListener('pointerenter' , () => {                
            this.cursorElement.classList.add(this.stateClasses.isHovered);
            this.auraElement.classList.add(this.stateClasses.isHovered);
            }),
            button.addEventListener('pointerleave' , () => {                
            this.cursorElement.classList.remove(this.stateClasses.isHovered);
            this.auraElement.classList.remove(this.stateClasses.isHovered);
            })
        })
    }
}

class CursorCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Cursor(element);
        });
    }
}

export default CursorCollection;

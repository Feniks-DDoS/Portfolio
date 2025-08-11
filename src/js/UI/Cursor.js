const rootSelector = `[data-js-page-body]`;

class Cursor {
    selectors = {
        cursor: `[data-js-cursor]`
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.cursorElement = this.rootElement.querySelector(this.selectors.cursor);

        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;

        this.bindEvents();
        this.animate = this.animate.bind(this); 
        this.animate();
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * 1;
        this.cursorY += (this.mouseY - this.cursorY) * 1;
        this.cursorElement.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        requestAnimationFrame(this.animate);
    }

    isPointerMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    bindEvents() {
        document.addEventListener('pointermove', (e) => this.isPointerMove(e));
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

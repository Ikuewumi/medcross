class CrossCell extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('connected')
    }
}


window.customElements.define('cross-cell', CrossCell)



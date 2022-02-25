class WebglCubeElement extends HTMLElement {

  constructor() {
    super()
  }

  static get observedAttributes() {
    return []
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      default:
        this.render()
    }
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = ''
  }
}

if (!window.customElements.get('webgl-cube')) {
  window.customElements.define('webgl-cube', WebglCubeElement)
}

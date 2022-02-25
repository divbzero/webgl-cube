class WebglCubeElement extends HTMLElement {

  constructor() {
    super()
  }

  get color() {
    return this.getAttribute('color') || undefined
  }

  set color(newValue) {
    switch (newValue) {
      case null:
      case undefined:
        this.removeAttribute('color')
        break
      default:
        this.setAttribute('color', newValue)
    }
  }

  static get observedAttributes() {
    return ['color']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'color':
        if (this.material) {
          this.material.color = new THREE.Color(newValue || oldValue || 0x00FF00)
        }
      default:
        // do nothing
    }
  }

  connectedCallback() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.appendChild(this.renderer.domElement)

    this.geometry = new THREE.BoxGeometry()
    this.material = new THREE.MeshBasicMaterial({color: this.getAttribute('color') || 0x00FF00})
    this.cube = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.cube)
    this.camera.position.z = 5

    this.render()
  }

  disconnectedCallback() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.geometry = null
    this.material = null
    this.cube = null
    this.innerHTML = ''
  }

  render() {
    requestAnimationFrame(this.render.bind(this))

    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.renderer.render(this.scene, this.camera)
  }
}

if (!window.customElements.get('webgl-cube')) {
  window.customElements.define('webgl-cube', WebglCubeElement)
}

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
    this.material = new THREE.MeshBasicMaterial({color: 0x00ff00})
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

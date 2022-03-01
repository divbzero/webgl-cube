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

    this.camera = new THREE.PerspectiveCamera(45, this.clientWidth / this.clientHeight, 0.1, 1000)
    this.camera.position.z = 3

    this.renderer = new THREE.WebGLRenderer({alpha: true})
    this.renderer.setClearColor(0xFFFFFF, 0)
    this.renderer.setSize(this.clientWidth, this.clientHeight)
    this.appendChild(this.renderer.domElement)

    this.geometry = new THREE.BoxGeometry()
    this.material = new THREE.MeshLambertMaterial({color: this.getAttribute('color') || 0x00FF00})
    this.cube = new THREE.Mesh(this.geometry, this.material)

    this.ambiance = new THREE.AmbientLight(0xffffff, 0.6)
    this.spotlight = new THREE.DirectionalLight(0xffffff, 0.6)
    this.spotlight.position.x = 1
    this.spotlight.position.y = 1
    this.spotlight.position.z = 1

    this.scene.add(this.cube)
    this.scene.add(this.ambiance)
    this.scene.add(this.spotlight)

    this.resizeObserver = new ResizeObserver(entries => {
      this.camera = new THREE.PerspectiveCamera(45, this.clientWidth / this.clientHeight, 0.1, 1000)
      this.camera.position.z = 3
      this.renderer.setSize(this.clientWidth, this.clientHeight)
    })
    this.resizeObserver.observe(this)

    this.render()
  }

  disconnectedCallback() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.geometry = null
    this.material = null
    this.cube = null
    this.ambiance = null
    this.spotlight = null
    this.resizeObserver.unobserve(this)
    this.resizeObserver = null
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

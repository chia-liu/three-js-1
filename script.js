import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading 
const textureLoader = new THREE.TextureLoader()
// conver normalmap --
// https://cpetry.github.io/NormalMap-Online/
const normalTexture = textureLoader.load('textures/NormalMap2.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// (ORIGNAL) const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
// const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const geometry = new THREE.TorusKnotGeometry( 15, 4, 300, 36 );
const geometry1 = new THREE.SphereGeometry( 10, 32, 16 );

// Materials

// (ORIGNAL) const material = new THREE.MeshBasicMaterial()
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture 
material.color = new THREE.Color(0xE9FF70)

const material2 = new THREE.MeshBasicMaterial();
material2.metalness = 0.7
material2.roughness = 1
// material2.normalMap = normalTexture 
material2.color = new THREE.Color(0x80FFDB)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const sphere2 = new THREE.Mesh( geometry1, material2 );
scene.add( sphere2 );

// Lights
// Light 1
const AmbientLight = new THREE.AmbientLight(0x404040,10)
AmbientLight.position.x = 2
AmbientLight.position.y = 3
AmbientLight.position.z = 4
scene.add(AmbientLight)

// Light 2
const pointLight = new THREE.PointLight(0x80FFDB, 0.2)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight.position.set(-6,3,-0.15)
pointLight.intensity = 0.85

scene.add(pointLight)
// const light = gui.addFolder('Light1')

// light.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
// light.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
// light.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
// light.add(pointLight, 'intensity').min(0).max(10).step(0.01)

// Helper-可在前端調整參數
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

// Light 3
const pointLight2 = new THREE.PointLight(0x17ffd6, 0.2)
pointLight2.position.set(6,-3,-9.39)
pointLight2.intensity = 10

scene.add(pointLight2)
// const light2 = gui.addFolder('Light2')

// light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position, 'z').min(-10).max(10).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// Change Color 
// const lightColor = {
//     color: 0x80FFDB
// }
// light2.addColor(lightColor,'color')
//     .onChange(()=>{
//         pointLight2.color.set(lightColor.color)
//     })


// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 100
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0 
let mouseY = 0

let targetX = 0 
let targetY = 0 

const windowX = window.innerWidth / 2 ; 
const windowY = window.innerHeight / 2 ; 
function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const updateSphere = (event) =>{
    sphere.position.y = window.scrollY * .05
}
window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere2.rotation.x = .5 * elapsedTime

    sphere.rotation.x += .5 * ( targetY - sphere.rotation.x )
    sphere.rotation.y += .5 * ( targetX - sphere.rotation.y )
    sphere.position.z += -0.5 * ( targetY - sphere.position.x )

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') // selecting where to render 
})

renderer.setPixelRatio(window.devicePixelRatio)  // to set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) // to mak eit full screen
camera.position.setZ(10); // to position camera on z axis

// renderer.render(scene,camera); 

const geometry = new THREE.TorusGeometry(10, 3, 16, 100) // a basic object 
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347 }) // material object will be wrapped in this material 
const torus = new THREE.Mesh(geometry, material) // to combine geometry and material together

// scene.add(torus) // to add this object in the scene

const pointLight = new THREE.PointLight("white") // basic light that emits light in all 
pointLight.position.set(0,0,20) // to position the light 

const ambientLight = new THREE.AmbientLight(0xffffff) // lightsup the whole scene equally 
scene.add(ambientLight,pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight) // tells the position of the light 
const gridHelper = new THREE.GridHelper(200, 50) // adds a grid to te wndiow
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement); //lisem to the mouse moment and adjust tjhe camera accordingly

//to load gtlf files 
const loader = new GLTFLoader()

loader.load(
  // resource URL
  'dist/moon.gltf',
  // called when the resource is loaded
  function (gltf) {
    gltf.scene.position.set(0,-5,3)
    scene.add(gltf.scene);
    //gltf.animations; // Array<THREE.AnimationClip>
    //gltf.scene; // THREE.Group
    //gltf.scenes; // Array<THREE.Group>
    //gltf.cameras; // Array<THREE.Camera>
    //gltf.asset; // Object

  },
  // called while loading is progressing
  // function (xhr) {

  //   console.log((xhr.loaded / xhr.total * 100) + '% loaded');

  // },
  // called when loading has errors
  function (error) {

    console.log('An error happened');

  }
);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24) // creates spheres with 0.25 radius
  const material = new THREE.MeshStandardMaterial({ color: "white" })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // generates a random array of 3 elements in range -100 to 100

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// const spaceTexture = new THREE.TextureLoader().load('javascript.svg')
// scene.background = spaceTexture // to set brackground 


// scene.add(moon)

renderer.render(scene, camera)

function animate() { // to initiate a nfine loop 
  requestAnimationFrame(animate)
  torus.rotation.x -= 0.01;
  controls.update();

  renderer.render(scene, camera)
}

animate()
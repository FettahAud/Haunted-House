import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Light } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// Door
const doorColorTexur = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexur = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexur = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexur = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexur = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexur = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexur = textureLoader.load('/textures/door/roughness.jpg')

// Bricks for Wall
const bricksColorTexur = textureLoader.load('/textures/bricks/color.jpg')
const bricksAOTexur = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexur = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexur = textureLoader.load('/textures/bricks/roughness.jpg')
// Grass for Floor
const grassColorTexur = textureLoader.load('/textures/grass/color.jpg')
const grassAOTexur = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexur = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexur = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexur.repeat.set(8, 8)
grassNormalTexur.repeat.set(8, 8)
grassRoughnessTexur.repeat.set(8, 8)
grassAOTexur.repeat.set(8, 8)

grassColorTexur.wrapS = THREE.RepeatWrapping
grassColorTexur.wrapT = THREE.RepeatWrapping

grassNormalTexur.wrapS = THREE.RepeatWrapping
grassNormalTexur.wrapT = THREE.RepeatWrapping

grassRoughnessTexur.wrapS = THREE.RepeatWrapping
grassRoughnessTexur.wrapT = THREE.RepeatWrapping

grassAOTexur.wrapS = THREE.RepeatWrapping
grassAOTexur.wrapT = THREE.RepeatWrapping

// Bush Grass
const bushColorTexur = textureLoader.load('/textures/grass2/Stylized_Grass_002_basecolor.jpg')
const bushAOTexur = textureLoader.load('/textures/grass2/Stylized_Grass_002_ambientOcclusion.jpg')
const bushHeightTexur = textureLoader.load('/textures/grass2/Stylized_Grass_002_height.png')
const bushNormalTexur = textureLoader.load('/textures/grass2/Stylized_Grass_002_normal.jpg')
const bushRoughnessTexur = textureLoader.load('/textures/grass2/Stylized_Grass_002_roughness.jpg')
// Grave
const graveColorTexur = textureLoader.load('/textures/Grave/color.jpg')
const graveAOTexur = textureLoader.load('/textures/Grave/AO.jpg')
const graveHeightTexur = textureLoader.load('/textures/Grave/height.png')
const graveNormalTexur = textureLoader.load('/textures/Grave/normal.jpg')
const graveRoughnessTexur = textureLoader.load('/textures/Grave/roughness.jpg')

// Window
const winColorTexur = textureLoader.load('/textures/Window/Color.jpg')
const winAOTexur = textureLoader.load('/textures/Window/AO.jpg')
const winHeightTexur = textureLoader.load('/textures/Window/Height.png')
const winNormalTexur = textureLoader.load('/textures/Window/Normal.jpg')
const winMetalnessTexur = textureLoader.load('/textures/Window/Metalice.jpg')
const winRoughnessTexur = textureLoader.load('/textures/Window/Roughness.jpg')
const winOpacityTexur = textureLoader.load('/textures/Window/Opacity.jpg')


/**
 * House
 */
{
    const house = new THREE.Group()
    scene.add(house)

    // Some Variables
    const wallHeight = 2.5
    const roofHeight = 1
    const wallDepth = 4

    // Walls
    {
        const walls = new THREE.Mesh(
            new THREE.BoxGeometry(4, wallHeight, wallDepth),
            new THREE.MeshStandardMaterial({
                map: bricksColorTexur,
                aoMap: bricksAOTexur,
                normalMap: bricksNormalTexur,
                roughnessMap: bricksRoughnessTexur
            })
        )
        walls.castShadow = true
        walls.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
        )

        house.position.y = wallHeight / 2
        house.add(walls)
    }

    // Roof
    {
        const roof = new THREE.Mesh(
            new THREE.ConeGeometry(3.5, roofHeight, 4),
            new THREE.MeshStandardMaterial({ color: '#b35f45' })
        )
        roof.position.y = (wallHeight / 2) + (roofHeight / 2)
        roof.rotation.y = Math.PI / 4
        house.add(roof)
    }

    // Door
    {
        const door = new THREE.Mesh(
            new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
            new THREE.MeshStandardMaterial({
                map: doorColorTexur,
                transparent: true,
                alphaMap: doorAlphaTexur,
                aoMap: doorAmbientOcclusionTexur,
                displacementMap: doorHeightTexur,
                displacementScale: 0.1,
                normalMap: doorNormalTexur,
                metalnessMap: doorMetalnessTexur,
                roughnessMap: doorRoughnessTexur
            })
        )
        door.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
        )
        door.position.y = -.25
        door.position.z = wallDepth / 2 + 0.01
        house.add(door)
    }
    // Window
    {
        const window = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshStandardMaterial({
                map: winColorTexur,
                transparent: true,
                aoMap: winAOTexur,
                displacementMap: winHeightTexur,
                displacementScale: 0,
                normalMap: winNormalTexur,
                metalnessMap: winMetalnessTexur,
                roughnessMap: winRoughnessTexur
            })
        )
        gui.add(window.position, 'x', -10, 10, .1)
        gui.add(window.position, 'y', -10, 10, .1)
        gui.add(window.position, 'z', -10, 10, .01)
        window.position.x = 1.2
        window.position.y = .4
        window.position.z = 2.02
        house.add(window)
    }
    // Bushes
    {
        const bushGeo = new THREE.SphereGeometry(1, 80, 80)
        const bushMat = new THREE.MeshStandardMaterial({
            map: bushColorTexur,
            aoMap: bushAOTexur,
            displacementMap: bushHeightTexur,
            normalMap: bushNormalTexur,
            roughnessMap: bushRoughnessTexur,
            metalness: 0,
            roughness: 2
        })

        for (let i = 0; i < 45; i++) {
            const bush = new THREE.Mesh(bushGeo, bushMat)
            const ranScale = randomNumGen(.5, .35)
            bush.scale.set(ranScale, ranScale, ranScale)
            if (i >= 0 && i <= 3) {
                const ranPosX = randomNumGen(2, 1)
                bush.position.set(ranPosX, -.77, 2.5)
                house.add(bush)
            } else if (i >= 4 && i <= 7) {
                const ranPosX = randomNumGen(-2.1, -.8)
                bush.position.set(ranPosX, -.77, 2.5)
                house.add(bush)
            } else if (i >= 8 && i <= 17) {
                const ranPosZ = randomNumGen(2.5, -2)
                bush.position.set(-2.6, -.77, ranPosZ)
                house.add(bush)
            } else if (i >= 18 && i <= 30) {
                const ranPosX = randomNumGen(2, -2)
                bush.position.set(ranPosX, -.77, -2.4)
                house.add(bush)
            } else if (i >= 31 && i <= 45) {
                const ranPosZ = randomNumGen(2, -2)
                bush.position.set(2.5, -.77, ranPosZ)
                house.add(bush)
            }
        }
    }

    // Graves Group
    {
        const gravesG = new THREE.Group()
        scene.add(gravesG)

        const graveGeo = new THREE.BoxGeometry(.6, .8, .2)
        const graveMat = new THREE.MeshStandardMaterial({
            map: graveColorTexur,
            aoMap: graveAOTexur,
            displacementMap: graveHeightTexur,
            normalMap: graveNormalTexur,
            roughnessMap: graveRoughnessTexur,
        })
        graveMat.displacementMap = 0
        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * 6
            const radius = 3.5 + Math.random() * 6
            const x = Math.sin(angle) * radius
            const z = Math.cos(angle) * radius

            const grave = new THREE.Mesh(graveGeo, graveMat)
            grave.position.set(x, .3, z)
            grave.rotation.y = (Math.random() - 0.5) * 0.4
            grave.rotation.z = (Math.random() - 0.5) * 0.4
            grave.castShadow = true
            gravesG.add(grave)
        }
    }
    // Floor
    {
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshStandardMaterial({
                map: grassColorTexur,
                aoMap: grassAOTexur,
                normalMap: grassNormalTexur,
                roughnessMap: grassRoughnessTexur
            })
        )
        floor.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
        )

        floor.rotation.x = - Math.PI * 0.5
        floor.position.y = 0
        floor.receiveShadow = true
        scene.add(floor)
    }
}
/**
 * Lights
 */
{
    // Ambient light
    {
        const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
        gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
        scene.add(ambientLight)
    }
    // Directional light
    {
        const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
        moonLight.position.set(4, 5, - 2)
        moonLight.castShadow = true
        gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
        gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
        gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
        gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
        scene.add(moonLight)
    }

    // Door Light
    {
        const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
        doorLight.position.set(0, 1, 2.5)
        doorLight.castShadow = true
        doorLight.shadow.mapSize.width = 256
        doorLight.shadow.mapSize.height = 256
        doorLight.shadow.camera.far = 7
        scene.add(doorLight)
    }
}
// Ghosts
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.mapSize.far = 7

scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * .5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 1.2)
    ghost1.position.z = Math.sin(ghost1Angle) * 4

    const ghost2Angle = - elapsedTime * .32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 1.4) + Math.sin(elapsedTime * 2.5)
    ghost2.position.z = Math.sin(ghost2Angle) * 5

    const ghost3Angle = - elapsedTime * .18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 2.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * .5))

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

function randomNumGen(max, min) {
    return Math.random() * (max - min) + min
}
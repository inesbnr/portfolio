"use client"; // Ensure this runs client-side in Next.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useEffect, useRef } from "react";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';


export default function ThreeScene() {
  
  const mountRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xD9D9D9);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 4);

    const controls = new OrbitControls(camera, renderer.domElement);

    const clock = new THREE.Clock();

    let characterMesh = null; // Déclarer characterMesh au début
    let upperZoneCube, lowerZoneCube; // Les cubes définissant les zones
    let currentSceneIndex = 0;
    const scenes = [];
    const mixers = [];

    let isRunning = false;
    let isSocks = false;

    // Fix duplicate event listener and raycaster/mouse definitions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Fonction pour créer les scènes
    function createScene1() {


        let currentModel = null;
        let mixer = null;
        let animationAction = null;
        let isPlaying = false;
        let currentAnimationFile = '/models/TESTanim.glb'; // Initially set to 'TESTanim.glb'


        const scene = new THREE.Scene();

        // Lumières
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5; // Shadow camera near plane
        directionalLight.shadow.camera.far = 50;  // Shadow camera far plane

        scene.add(directionalLight);

        // Optional: Add a PointLight for localized vivid light
        const pointLight = new THREE.PointLight(0xffa500, 2, 50); // Orange light
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);


        // Sol
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        floor.position.y = -1;  // Position it below the model
        scene.add(floor);

        // GLTF Loader
        const gltfLoader = new GLTFLoader();

        function loadAnimation(url) {
            gltfLoader.load(
                url, // The URL to the GLB file
                (gltf) => {
                    console.log('GLB loaded:', gltf);
        
                    // Remove the previous model if it exists
                    if (currentModel) {
                        scene.remove(currentModel);
                    }
        
                    const model = gltf.scene;
                    scene.add(model);
                    currentModel = model;
                    characterMesh = model; // Assigner le modèle à characterMesh
        
                    // Enable shadows for the model's mesh objects
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;  // Enable shadows from the model
                            child.receiveShadow = true; // Enable receiving shadows
                        }
                    });
        
                    if (gltf.animations && gltf.animations.length > 0) {
                        mixer = new THREE.AnimationMixer(model);
                        animationAction = mixer.clipAction(gltf.animations[0]); // First animation
                        if (isRunning==false) {
                            animationAction.stop(); 
                            console.log('Animation stopped.');
                        } else {
                            animationAction.play();
                            console.log('Animation started.');
                        }
                        animationAction.play();
                    } else {
                        console.warn('No animations found in the GLB file.');
                    }
        
                    model.scale.set(2, 2, 2); // Adjust scale if needed
                    model.position.set(0, -1, 0); // Position the model slightly above the floor
                },
                (xhr) => {
                    console.log(`${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
                },
                (error) => {
                    console.error('Error loading GLB:', error);
                }
            );
        }
        // Load the first animation when the scene starts
        loadAnimation(currentAnimationFile);

const section = document.getElementById('section3D');
 // Create the button

const buttonstartstop = document.createElement('buttonstartstop');
buttonstartstop.innerText = 'Start/Stop';

// Button positioning and styling

buttonstartstop.style.position = 'absolute';
buttonstartstop.style.top = '100px'; 
buttonstartstop.style.left = '20px';
buttonstartstop.style.padding = '10px 20px';  // Add padding for better sizing
buttonstartstop.style.fontSize = '16px';      // Set font size
buttonstartstop.style.fontFamily = 'Montserrat, sans-serif'; // Change font family
buttonstartstop.style.backgroundSize = 'cover';  // Ensure the background image covers the button area
buttonstartstop.style.backgroundColor = 'white';  // Ensure the background image covers the button area
buttonstartstop.style.backgroundPosition = 'center';  // Position the background image in the center
buttonstartstop.style.color = 'black';             // White text color
buttonstartstop.style.border = 'none';             // Remove border
buttonstartstop.style.borderRadius = '20px';       // Rounded corners
buttonstartstop.style.cursor = 'pointer';         // Show pointer on hover
buttonstartstop.style.transition = 'background-color 0.3s ease';  // Smooth background color transition
buttonstartstop.style.display = 'block';

// Append the button to the section
section.appendChild(buttonstartstop);
scene.userData.startButton = buttonstartstop;
        
        const invisibleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true });

        // Cube supérieur (zone au-dessus du personnage)
        const upperCubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);  // Ajustez la taille
        
        const upperZoneCube = new THREE.Mesh(upperCubeGeometry, invisibleMaterial);
        upperZoneCube.position.set(-0.3, 1.3, 0.3);  // Positionné 2 unités au-dessus
        scene.add(upperZoneCube);

        // Cube supérieur (zone au-dessus du personnage)
        const lowerCubeGeometry = new THREE.BoxGeometry(1, 0.6, 0.5);  // Ajustez la taille
        const lowerZoneCube = new THREE.Mesh(lowerCubeGeometry, invisibleMaterial);
        lowerZoneCube.position.set(0, -0.5, 0.3);  // Positionné 2 unités au-dessus
        scene.add(lowerZoneCube);

        // 3D Button for toggling between animations
        const buttonGeometry2 = new THREE.BoxGeometry(0.8, 0.3, 0.5);
        const buttonMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true }); // A different color for the second button
        const buttonMesh2 = new THREE.Mesh(buttonGeometry2, buttonMaterial2);
        buttonMesh2.position.set(2, -0.75, 0); // Position it to the right of the first button
        scene.add(buttonMesh2);

        // Load the socks.glb model

gltfLoader.load(
    '/models/socks.glb', // Path to the socks model
    (gltf) => {
        console.log('Socks model loaded:', gltf);
        
        const socksModel = gltf.scene;
        scene.add(socksModel); // Add the socks model to the scene

        // Position the socks model at the same position as buttonMesh2
        socksModel.position.set(2, -0.75, 0);

        // Optionally, scale and adjust the model if needed
        socksModel.scale.set(2, 2, 2); // Scale it to the right size
       
    },
    (xhr) => {
        console.log(`${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
    },
    (error) => {
        console.error('Error loading socks.glb:', error);
    }
);

        // Raycaster for detecting button clicks
        // const raycaster = new THREE.Raycaster(); // Remove this line
        // const mouse = new THREE.Vector2(); // Remove this line

        // Adjust mouse position for the canvas
    window.addEventListener('click', (event) => {
        // Get canvas bounds
        const canvasBounds = renderer.domElement.getBoundingClientRect();

        // Map mouse position to normalized device coordinates (-1 to +1)
        mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
        mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

        // Use raycaster to find intersected objects
        raycaster.setFromCamera(mouse, camera);
        const intersects2 = raycaster.intersectObject(buttonMesh2);



        if (intersects2.length > 0) {
            toggleAnimations(); // Switch between the two animations
        }
    });

    buttonstartstop.addEventListener('click', () => {
      isPlaying = !isPlaying;
    
      if (isPlaying) {
        animationAction.stop(); 
        console.log('Animation stopped.');
      } else {
        animationAction.play();
        console.log('Animation started.');
      }
    });



        function toggleAnimations() {
            currentAnimationFile = (currentAnimationFile === '/models/TESTanim.glb') ? 
                '/models/runningsocks.glb' : '/models/TESTanim.glb';
            console.log(`Switching to animation: ${currentAnimationFile}`);
            loadAnimation(currentAnimationFile);
        }

        

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();
            if (mixer) mixer.update(delta);

            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        // Adjust canvas and camera on resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });


       

// Create the button
const button = document.createElement('button');
button.innerText = 'Change Scene';

// Button positioning and styling
button.style.position = 'absolute';
button.style.top = '50px'; 
button.style.left = '20px';
button.style.padding = '10px 20px';  // Add padding for better sizing
button.style.fontSize = '16px';      // Set font size
button.style.fontFamily = 'Montserrat, sans-serif'; // Change font family
button.style.backgroundSize = 'cover';  // Ensure the background image covers the button area
button.style.backgroundPosition = 'center';  // Position the background image in the center
button.style.color = 'white';             // White text color
button.style.border = 'none';             // Remove border
button.style.borderRadius = '20px';       // Rounded corners
button.style.cursor = 'pointer';         // Show pointer on hover
button.style.transition = 'background-color 0.3s ease';  // Smooth background color transition
button.style.display = 'block'; // Initially hidden

// Append the button to the section
section.appendChild(button);
// Function to toggle between light and dark modes
let isDarkMode = false;


        // Button click event listener
button.addEventListener('click', () => {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
      // Set the scene background to dark
      scene.background = new THREE.Color('#F4D1AE'); // Dark background


      // Optionally, apply glowing effects, or neon materials if you want
      // For example, you could apply glowing materials to models in the scene
  } else {
      // Set the scene background to light
      scene.background = new THREE.Color(0xffffff); // Light background

      // Reset any glowing materials to original ones if used
      // Optionally, you could reset materials here if you have specific models
  }

  console.log(isDarkMode ? 'Dark mode activated' : 'Light mode activated');
});

        return scene;
    }


    function createScene2() {
        const scene = new THREE.Scene();
        scene.userData = {
            composer: null,
            model: null,
            interactiveCubes: [],
            tooltip: null,
            raycaster: new THREE.Raycaster(),
            mouse: new THREE.Vector2(),
            modeButton: null  // Add reference to the button
        };

        // Create the button
        const section = document.getElementById('section3D');

        const button = document.createElement('button');
        button.innerText = 'Light / Dark Mode';
        button.style.position = 'absolute';
        button.style.top = '50px'; 
        button.style.left = '20px';
        button.style.padding = '10px 20px';  // Add padding for better sizing
        button.style.fontSize = '16px';      // Set font size
        button.style.fontFamily = 'Montserrat, sans-serif'; // Change font family
        button.style.backgroundColor = '#007bff';  // Blue background
        button.style.color = 'white';             // White text color
        button.style.border = 'none';             // Remove border
        button.style.borderRadius = '20px';       // Rounded corners
        button.style.cursor = 'pointer';         // Show pointer on hover
        button.style.transition = 'background-color 0.3s ease';  // Smooth background color transition
        button.style.display = 'none'; // Initially hidden
        section.appendChild(button);
       
        button.addEventListener('click', toggleMode);
        
        // Store button reference
        scene.userData.modeButton = button;

        // Lumières
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Sol
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1;
        floor.receiveShadow = true;
        scene.add(floor);

        // Charger le modèle GLTF (bracelet)
        const gltfLoader = new GLTFLoader();
        let model;

        function loadBraceletModel(url) {
            gltfLoader.load(url, (gltf) => {
                console.log('GLB loaded:', gltf);
                model = gltf.scene;
                // Save original materials
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.userData.originalMaterial = child.material.clone(); // Clone and store original material
                    }
                });

                // Traverse through all children of the loaded model
            
                scene.add(model);

                // Adjust the scale and position of the model
                model.scale.set(40, 40, 40);
                model.position.set(2, 0, 0);


                // Scene and lighting adjustments for light mode
                bloomPass.enabled = false;
                scene.background = new THREE.Color(0xffffff);
                ambientLight.intensity = 1;
                directionalLight.intensity = 1;
            });
        }

        loadBraceletModel('/models/bracelet.glb');

        // Neon material setup
        const neonMaterial = new THREE.MeshStandardMaterial({
            color: 0x0014E7,
            emissive: 0x0014E7,
            emissiveIntensity: 2,
            roughness: 0.5,
            metalness: 1,
        });

        // Post-processing setup with adjusted bloom parameters
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.5,    // Strength
            1.0,    // Radius
            0.1     // Threshold
        );
        composer.addPass(bloomPass);

        // Function to toggle between light and dark modes
        let isDarkMode = false;

        function toggleMode() {
            isDarkMode = !isDarkMode;

            if (isDarkMode) {
                // Dark Mode: Apply neon material to the bracelet and enable bloom effect
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = neonMaterial; // Apply glowing material to the bracelet
                    }
                });
                bloomPass.enabled = true; // Enable bloom effect
                ambientLight.intensity = 0.05; // Dim ambient light
                directionalLight.intensity = 0.1; // Dim directional light
                scene.background = new THREE.Color(0x000000); // Dark background
            } else {
                // Light Mode: Remove bloom effect and use original materials for the bracelet
                // Light Mode: Restore original materials and disable bloom effect
                model.traverse((child) => {
                    if (child.isMesh && child.userData.originalMaterial) {
                        child.material = child.userData.originalMaterial; // Reapply original material
                    }
                });
                bloomPass.enabled = false; // Disable bloom effect
                ambientLight.intensity = 1; // Brighter ambient light
                directionalLight.intensity = 1; // Brighter directional light
                scene.background = new THREE.Color(0xffffff); // Light background
            }
        }

        scene.userData.composer = composer;
        scene.userData.bloomPass = bloomPass;
        

        // Create cubes
        const cubeDescriptions = [
            "LEDs : Instant feedback on heart rate",
            "Pulse sensor : To receive heart rate data",
            "Vibration motor : Instant feedback on cadence"
        ];

        const cubePositions = [
          { x: -1, y: 2, z: 0 },  // Position of the first cube
          { x: 0.5, y: 0.75, z: -0.25 },   // Position of the second cube
          { x: 1, y: 0.75, z: -0.25 }    // Position of the third cube
        ];
        
        for (let i = 0; i < 3; i++) {
            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 1, 1),
                new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true })
            );
            // Set the cube position from the cubePositions array
            const position = cubePositions[i];
            cube.position.set(position.x, position.y, position.z);
            cube.userData.description = cubeDescriptions[i];
            scene.userData.interactiveCubes.push(cube);
            scene.add(cube);
        }

        // Create tooltip
        scene.userData.tooltip = document.createElement('div');
        scene.userData.tooltip.style.position = 'absolute';
        scene.userData.tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
        scene.userData.tooltip.style.color = 'white';
        scene.userData.tooltip.style.padding = '10px 15px';
        scene.userData.tooltip.style.top= '200px';
        scene.userData.tooltip.style.borderRadius = '5px';
        scene.userData.tooltip.style.fontFamily = 'Arial, sans-serif';
        scene.userData.tooltip.style.zIndex = 101; // Ensure it is above the canvas
       


        scene.userData.tooltip.style.pointerEvents = 'none';
        scene.userData.tooltip.style.display = 'none';

        section.appendChild(scene.userData.tooltip);

        return scene;
    }



    function createScene3() {
        const scene = new THREE.Scene();

        // Lumières
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5; // Shadow camera near plane
        directionalLight.shadow.camera.far = 50;  // Shadow camera far plane

        scene.add(directionalLight);

        // Optional: Add a PointLight for localized vivid light
        const pointLight = new THREE.PointLight(0xffa500, 2, 50); // Orange light
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Sol
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Modèle animé
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('/models/socks.glb', (gltf) => {
            const model = gltf.scene;
            model.position.set(0, 0.2, 0);
            model.scale.set(10, 10, 10);
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(model);
        });

        
        return scene;
    }


    // Ajouter les scènes au gestionnaire
    scenes.push(createScene1());
    scenes.push(createScene2());
    scenes.push(createScene3());


    // Create a function to manage event listeners
    function setupEventListeners(sceneIndex) {
        // Remove all existing listeners first
        removeAllEventListeners();
        
        switch(sceneIndex) {
            case 0:
                setupScene1Listeners();
                break;
            case 1:
                setupScene2Listeners();
                break;
            case 2:
                setupScene3Listeners();
                break;
        }
    }

    // Store active listeners to remove them later
    const activeListeners = {
        click: [],
        mousemove: []
    };

    function removeAllEventListeners() {
        activeListeners.click.forEach(listener => {
            window.removeEventListener('click', listener);
        });
        activeListeners.mousemove.forEach(listener => {
            window.removeEventListener('mousemove', listener);
        });
        activeListeners.click = [];
        activeListeners.mousemove = [];

        // Hide tooltips from all scenes
        scenes.forEach(scene => {
            if (scene.userData && scene.userData.tooltip) {
                scene.userData.tooltip.style.display = 'none';
            }
        });
    }

    // Fix setupScene1Listeners to use the correct variables
    function setupScene1Listeners() {
        const scene = scenes[0];
        const upperZoneCube = scene.children.find(child => 
            child.geometry?.type === 'BoxGeometry' && 
            child.position.y === 1.3
        );
        const lowerZoneCube = scene.children.find(child => 
            child.geometry?.type === 'BoxGeometry' && 
            child.position.y === -0.5
        );

        const clickHandler = (event) => {
            if (currentSceneIndex !== 0) return;
            
            // Calculate mouse position
            const canvasBounds = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
            mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            
            // Check intersections with all interactive objects
            const intersects = raycaster.intersectObjects([
                upperZoneCube, 
                lowerZoneCube
            ].filter(Boolean)); // Filter out any undefined objects

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                
                // Handle different interactions based on the object
                if (intersectedObject === upperZoneCube) {
                    console.log(`up`);
                    switchScene(1);
                } else if (intersectedObject === lowerZoneCube) {
                    switchScene(2);
                }
            }
        };

        // Add the click listener
        window.addEventListener('click', clickHandler);
        activeListeners.click.push(clickHandler);
    }



    function setupScene2Listeners() {
        const scene = scenes[1];
        const sceneData = scene.userData;
        
        const mousemoveHandler = (event) => {
            if (currentSceneIndex !== 1) return; // Exit if not in scene 2

            const canvasBounds = renderer.domElement.getBoundingClientRect();
            sceneData.mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
            sceneData.mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

            sceneData.raycaster.setFromCamera(sceneData.mouse, camera);
            const intersects = sceneData.raycaster.intersectObjects(sceneData.interactiveCubes);

            if (intersects.length > 0) {
                const intersectedCube = intersects[0].object;
                sceneData.tooltip.style.display = 'block';
                sceneData.tooltip.style.left = event.clientX + 10 + 'px';
                sceneData.tooltip.style.top = event.clientY + 10 + 'px';
                sceneData.tooltip.textContent = intersectedCube.userData.description;
    

            } else {
                sceneData.tooltip.style.display = 'none';
            }
        };

        window.addEventListener('mousemove', mousemoveHandler);
        activeListeners.mousemove.push(mousemoveHandler);
    }

    function setupScene3Listeners() {
        const scene = scenes[2];
        const sceneData = scene.userData;
        
        const mousemoveHandler = (event) => {
            if (currentSceneIndex !== 1) return; // Exit if not in scene 2

            const canvasBounds = renderer.domElement.getBoundingClientRect();
            sceneData.mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
            sceneData.mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

            sceneData.raycaster.setFromCamera(sceneData.mouse, camera);
            const intersects = sceneData.raycaster.intersectObjects(sceneData.interactiveCubes);

            if (intersects.length > 0) {
                const intersectedCube = intersects[0].object;
                sceneData.tooltip.style.display = 'block';
                sceneData.tooltip.style.left = event.clientX + 10 + 'px';
                sceneData.tooltip.style.top = event.clientY + 10 + 'px';
                sceneData.tooltip.textContent = intersectedCube.userData.description;
            } else {
                sceneData.tooltip.style.display = 'none';
            }
        };

        window.addEventListener('mousemove', mousemoveHandler);
        activeListeners.mousemove.push(mousemoveHandler);
    }

    // Update the switchScene function to setup listeners
    function switchScene(index) {
        // Hide mode button from scene 2 if it exists
        if (scenes[0]?.userData.startButton) {
          scenes[0].userData.startButton.style.display = index === 0 ? 'block' : 'none';
          
        }

        if (scenes[1]?.userData.modeButton) {
            scenes[1].userData.modeButton.style.display = index === 1 ? 'block' : 'none';
        }


        const targetPosition = new THREE.Vector3(0, 2, 2); // Desired camera position for zoom
        const initialFOV = camera.fov;
        const targetFOV = 15; // Narrower field of view for a zoomed-in effect
        const duration = 0.02; // Animation duration in seconds

        // Smooth zoom-in animation
        const zoomIn = () => {
            return new Promise((resolve) => {
                let elapsedTime = 0;
                const initialPosition = camera.position.clone();

                function animateZoom() {
                    elapsedTime += clock.getDelta();
                    const t = Math.min(elapsedTime / duration, 1); // Progress of animation (0 to 1)

                    // Interpolate position
                    camera.position.lerpVectors(initialPosition, targetPosition, t);

                    // Interpolate FOV
                    camera.fov = THREE.MathUtils.lerp(initialFOV, targetFOV, t);
                    camera.updateProjectionMatrix();

                    if (t < 1) {
                        requestAnimationFrame(animateZoom);
                    } else {
                        resolve(); // Animation complete
                    }
                }

                animateZoom();
            });
        };


        // Switch scene after zoom-in is complete
        zoomIn().then(() => {
            currentSceneIndex = index;
            setupEventListeners(index); // Setup new listeners
            resetCameraZoom();
        });
    }

    // Initialize listeners for the first scene
    setupEventListeners(0);

    // Function to reset the camera zoom
    function resetCameraZoom() {
        const originalFOV = 75; // Original FOV value
        const duration = 0.05;

        let elapsedTime = 0;
        const currentFOV = camera.fov;
        const originalPosition = new THREE.Vector3(0, 4, 5); // Default camera position

        function animateResetZoom() {
            elapsedTime += clock.getDelta();
            const t = Math.min(elapsedTime / duration, 1);

            // Interpolate position
            camera.position.lerpVectors(camera.position, originalPosition, t);

            // Interpolate FOV
            camera.fov = THREE.MathUtils.lerp(currentFOV, originalFOV, t);
            camera.updateProjectionMatrix();

            if (t < 1) {
                requestAnimationFrame(animateResetZoom);
            }
        }

        animateResetZoom();
    }


    // Animation principale
    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        // Mettre à jour les mixers (animations des modèles)
        mixers.forEach((mixer) => mixer.update(delta));

        controls.update();

        // Use composer for scene 2, regular renderer for other scenes
        if (currentSceneIndex === 1) {
           scenes[1].userData.composer.render();
        } else {
            renderer.render(scenes[currentSceneIndex], camera);
        }
    }

    animate();

    // Gestion des entrées clavier pour changer de scène
window.addEventListener("keydown", (event) => {
  if (event.key === "1") switchScene(0);
  if (event.key === "2") switchScene(1);
  if (event.key === "3") switchScene(2);
});


        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });

        return () => {
          

          // Remove the renderer
          if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
          }
        };

        
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

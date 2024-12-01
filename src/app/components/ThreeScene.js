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

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
 controls.update(); 
    camera.position.set(0, 3, 5);
    // Optionally, if you want to set the camera rotation manually, you can use:


   


    const clock = new THREE.Clock();

    let characterMesh = null; // Déclarer characterMesh au début
    let upperZoneCube, lowerZoneCube; // Les cubes définissant les zones
    let currentSceneIndex = 0;
    const scenes = [];
    const mixers = [];

    let isRunning = true;
    let isSocks = false;
    let isPlaying = false;

    // Fix duplicate event listener and raycaster/mouse definitions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();




const section = document.getElementById('section3D');

const buttoninfo = document.createElement('buttoninfo');
buttoninfo.innerText = 'i';
buttoninfo.id = 'buttoninfo';  // Add an ID for easier selection


// Button positioning and styling

buttoninfo.style.position = 'absolute';
buttoninfo.style.top = '33px'; 
buttoninfo.style.left = '17px';
buttoninfo.style.padding = '2px 14px';  // Add padding for better sizing
buttoninfo.style.fontSize = '20px';      // Set font size
buttoninfo.style.fontWeight = '800';      // Set font size
buttoninfo.style.fontFamily = 'Montserrat, sans-serif'; // Change font family
buttoninfo.style.backgroundSize = 'cover';  // Ensure the background image covers the button area
buttoninfo.style.color = '#12263A';             // White text color
buttoninfo.style.border = '3px solid #12263A';             // Remove border
buttoninfo.style.borderRadius = '50px';       // Rounded corners
buttoninfo.style.cursor = 'pointer';         // Show pointer on hover
buttoninfo.style.transition = 'background-color 0.3s ease';  // Smooth background color transition
buttoninfo.style.display = 'none';

// Append the button to the section
section.appendChild(buttoninfo);

// Tooltip content that appears when hovering
const tooltipinfo = document.createElement('span');
tooltipinfo.innerText = 'Welcome !\n Click on the socks to put them on the runner.\nClick on the wrist to see the bracelet.\nClick on the feet the see the socks.';
tooltipinfo.style.position = 'absolute';
tooltipinfo.style.width = '200px'; // Set a fixed width
tooltipinfo.style.height = 'auto'; // Let the height adjust based on the content

tooltipinfo.style.top = '50px'; // Position it below the button
tooltipinfo.style.left = '0';
tooltipinfo.style.padding = '5px 5px';
tooltipinfo.style.backgroundColor = '#fff';
tooltipinfo.style.color = '#12263A';
tooltipinfo.style.border = '1px solid #12263A';
tooltipinfo.style.borderRadius = '5px';
tooltipinfo.style.fontSize = '14px';
tooltipinfo.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2)';
tooltipinfo.style.display = 'none'; // Initially hidden
buttoninfo.appendChild(tooltipinfo);

// Show tooltip on hover
buttoninfo.addEventListener('mouseenter', () => {
    tooltipinfo.style.display = 'block';
});

// Hide tooltip when mouse leaves the button
buttoninfo.addEventListener('mouseleave', () => {
    tooltipinfo.style.display = 'none';
});


    // Fonction pour créer les scènes
    function createScene1() {


        let currentModel = null;
        let mixer = null;
        let animationAction = null;

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


        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x888888, // Initial color
            roughness: 0.5 
        });


        // Sol
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            floorMaterial
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
buttonstartstop.id = 'buttonstartstop';  // Add an ID for easier selection


// Button positioning and styling

buttonstartstop.style.position = 'absolute';
buttonstartstop.style.top = '30px'; 
buttonstartstop.style.left = '65px';
buttonstartstop.style.padding = '10px 20px';  // Add padding for better sizing
buttonstartstop.style.fontSize = '16px';      // Set font size
buttonstartstop.style.fontFamily = 'Montserrat, sans-serif'; // Change font family
buttonstartstop.style.backgroundSize = 'cover';  // Ensure the background image covers the button area
buttonstartstop.style.backgroundColor = '#12263A';  // Ensure the background image covers the button area
buttonstartstop.style.color = '#fff';             // White text color
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
        const buttonGeometry2 = new THREE.BoxGeometry(0.8, 0.6, 0.5);
        const buttonMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true }); // A different color for the second button
        const buttonMesh2 = new THREE.Mesh(buttonGeometry2, buttonMaterial2);
        buttonMesh2.position.set(1.1, -0.5, 0); // Position it to the right of the first button
        scene.add(buttonMesh2);

        // Load the socks.glb model

gltfLoader.load(
    '/models/smartsocks.glb', // Path to the socks model
    (gltf) => {
        console.log('Socks model loaded:', gltf);
        
        const socksModel = gltf.scene;
        scene.add(socksModel); // Add the socks model to the scene

        // Position the socks model at the same position as buttonMesh2
        socksModel.position.set(1.1, -0.6, 0);

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
const buttoncolor = document.createElement('button');
buttoncolor.innerText = 'Scene Color';
buttoncolor.id = 'buttoncolor';  // Add an ID for easier selection
scene.userData.buttoncolor = buttoncolor;
// Button positioning and styling
buttoncolor.style.position = 'absolute';
buttoncolor.style.top = '30px'; 
buttoncolor.style.right = '15px';
buttoncolor.style.padding = '10px 20px';  // Add padding for better sizing
buttoncolor.style.fontSize = '16px';      // Set font size
buttoncolor.style.fontFamily = 'Montserrat, sans-serif'; // Change font family
buttoncolor.style.backgroundSize = 'cover';  // Ensure the background image covers the button area
buttoncolor.style.backgroundPosition = 'center';  // Position the background image in the center
buttoncolor.style.backgroundColor = '#12263A';  // Position the background image in the center
buttoncolor.style.color = 'white';             // White text color
buttoncolor.style.border = 'none';             // Remove border
buttoncolor.style.borderRadius = '20px';       // Rounded corners
buttoncolor.style.cursor = 'pointer';         // Show pointer on hover
buttoncolor.style.transition = 'background-color 0.3s ease';  // Smooth background color transition
buttoncolor.style.display = 'block'; // Initially hidden

// Append the button to the section
section.appendChild(buttoncolor);
// Function to toggle between light and dark modes



        // Button click event listener
// Define the array of colors to cycle through
const colors = ['#F4D1AE', '#D1FEFF', '#CEFFED', '#CCE5FF', '#FFF6F2'];
const floorcolors= ['#c3a787', '#a0c7cc', '#a4ccbc', '#a3b6cc', '#ccc8bf']
let colorIndex = 0; // Start at the first color

// Button click event listener
buttoncolor.addEventListener('click', () => {
    // Update the scene background with the current color
    scene.background = new THREE.Color(colors[colorIndex]);
    floorMaterial.color.set(floorcolors[colorIndex]);

    // Increment the index to the next color
    colorIndex = (colorIndex + 1) % colors.length; // Loop back to the start when reaching the end
});


        return scene;
    }


    function createBackButton(scene) {
        const section = document.getElementById('section3D');
        const buttonback = document.createElement('button');
        buttonback.innerText = 'Go Back';
        buttonback.id = 'buttonback';

        // Button styling
        buttonback.style.position = 'absolute';
        buttonback.style.top = '30px';
        buttonback.style.right = '20px';
        buttonback.style.padding = '10px 20px';
        buttonback.style.fontSize = '16px';
        buttonback.style.fontFamily = 'Montserrat, sans-serif';
        buttonback.style.backgroundColor = '#12263A';
        buttonback.style.color = '#fff';
        buttonback.style.border = 'none';
        buttonback.style.borderRadius = '20px';
        buttonback.style.cursor = 'pointer';
        buttonback.style.transition = 'background-color 0.3s ease';
        buttonback.style.display = 'none';

        buttonback.addEventListener('click', () => {
            switchScene(0);
            buttonback.style.display = 'none';
        });

        section.appendChild(buttonback);
        return buttonback;
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
        button.style.top = '30px'; 
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
        scene.userData.tooltip.style.fontFamily = 'Montserrat, sans-serif';
        scene.userData.tooltip.style.zIndex = 101; // Ensure it is above the canvas
       


        scene.userData.tooltip.style.pointerEvents = 'none';
        scene.userData.tooltip.style.display = 'none';

        section.appendChild(scene.userData.tooltip);
        

        scene.userData.backButton = createBackButton(scene);

        return scene;
    }



    function createScene3() {
        const scene = new THREE.Scene();
        
        // Initialize userData object with required properties
        scene.userData = {
            interactiveCubes: [],
            raycaster: new THREE.Raycaster(),
            mouse: new THREE.Vector2()
        };

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
        gltfLoader.load('/models/smartsocks.glb', (gltf) => {
            const model = gltf.scene;
            model.position.set(0, 1.2, 0);
            model.scale.set(10, 10, 10);
            model.rotation.y = Math.PI / 3; // Rotate 45 degrees around the X-axis
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(model);
        });

        // Create cubes
        const cubeDescriptions = [
            "EMG sensors detects muscles activity",
            "Pressure sensors detects stride patterns while running",
            "IMU sensors detects movements and position of the feet"
        ];

        const cubePositions = [
          { x: -1.3, y: 2.9, z: 1.65 },  // Position of the first cube
          { x: -1.3, y: 0.75, z: 1.65 },   // Position of the second cube
          { x: -1.3, y: 2.5, z: 1.65 }    // Position of the third cube
        ];
        
        for (let i = 0; i < 3; i++) {
            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.2, 0.6),
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
        scene.userData.tooltip.style.fontFamily = 'Montserrat, sans-serif';
        scene.userData.tooltip.style.zIndex = 101; // Ensure it is above the canvas
       


        scene.userData.tooltip.style.pointerEvents = 'none';
        scene.userData.tooltip.style.display = 'none';

        section.appendChild(scene.userData.tooltip);
        

        

        
        scene.userData.backButton = createBackButton(scene);

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
        buttoninfo.style.display = 'block';

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
                    setupScene2Listeners();
                             // Get the section where the button is located
                    const section = document.getElementById('section3D');

                    // Hide buttons instead of removing them
                    const buttonstartstop = section.querySelector('#buttonstartstop');
                    if (buttonstartstop) {
                        buttonstartstop.style.display = 'none';
                    }
                    
                    const buttoninfo = section.querySelector('#buttoninfo');
                    if (buttoninfo) {
                        buttoninfo.style.display = 'none';
                    }

                    const buttoncolor = section.querySelector('#buttoncolor');
                    if (buttoncolor) {
                        buttoncolor.style.display = 'none';
                    }
        
                } else if (intersectedObject === lowerZoneCube) {
                    scenes[0].userData.startButton.style.display = 'none';
                    switchScene(2);
                    setupScene3Listeners();
                    const section = document.getElementById('section3D');
                    const buttoncolor = section.querySelector('#buttoncolor');
                    if (buttoncolor) {
                        buttoncolor.style.display = 'none';
                    }

                    const button = section.querySelector('#buttonstartstop');
                    if (button) {
                        button.style.display = 'none';
                    }
                    
                    const buttoninfo = section.querySelector('#buttoninfo');
                    if (buttoninfo) {
                        buttoninfo.style.display = 'none';
                    }
                    
                  
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
        const scene = scenes[2];  // Get scene 3
        const sceneData = scene.userData;
        
        const mousemoveHandler = (event) => {
            if (currentSceneIndex !== 2) return; // Change from 1 to 2 to check for scene 3
            
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
        // Hide buttoninfo based on scene
        buttoninfo.style.display = 'none';

        // Handle back button visibility
        scenes.forEach(scene => {
            if (scene.userData.backButton) {
                scene.userData.backButton.style.display = (index === 1 || index === 2) ? 'block' : 'none';
            }
        });

        // Handle buttonstartstop visibility
        if (scenes[0]?.userData.startButton) {
            scenes[0].userData.startButton.style.display = index === 0 ? 'block' : 'none';
        }

        // Hide buttoncolor for scenes 2 and 3
        if (scenes[0]?.userData.buttoncolor) {
            scenes[0].userData.buttoncolor.style.display = index === 0 ? 'block' : 'none';
        }

        // Show/hide mode button for scene 2
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

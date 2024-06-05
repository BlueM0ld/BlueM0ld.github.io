document.addEventListener('DOMContentLoaded', () => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x151515); // Black background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a group to hold all the small cubes
    const group = new THREE.Group();

    // Dimensions for the cube of cubes
    const gridSize = 10; // 3x3x3
    const cubeSize = 0.05;
    const spacing = 1;

    const colors = [0x9197ae, 0xd43838, 0xffa737, 0xf1dac4]
    // Create the cubes and add them to the group
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
                const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                const random = Math.floor(Math.random() * colors.length);
                const material = new THREE.MeshStandardMaterial({ color: colors[random] }); // Magenta color
                const smallCube = new THREE.Mesh(geometry, material);

                // Position each cube
                smallCube.position.set(
                    x * spacing - (gridSize - 1) * spacing / 2,
                    y * spacing - (gridSize - 1) * spacing / 2,
                    z * spacing - (gridSize - 1) * spacing / 2
                );

                group.add(smallCube);
            }
        }
    }

    scene.add(group);

    // Add a point light
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        group.rotation.x += 0.005;
        group.rotation.y += 0.005;

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    animate();

    // // Scroll transition
    // window.addEventListener('scroll', () => {
    //     const scrollPosition = window.scrollY;
    //     const windowHeight = window.innerHeight;

    //     if (scrollPosition > windowHeight / 1.5) {
    //         document.getElementById('content').style.transform = 'translateY(0)';
    //     } else {
    //         document.getElementById('content').style.transform = 'translateY(100vh)';
    //     }
    // });

    // Navigation and content loading
    const navLinks = document.querySelectorAll('#side-nav a');
    const mainContent = document.getElementById('main-content');

    const sections = {
        about: `<section id="about"><h2>About Me</h2><p>A brief introduction about yourself.</p></section>`,
        experience: `<section id="experience"><h2>Experience</h2><p>Details about your professional experience.</p></section>`,
        education: `<section id="education"><h2>Education</h2><p>Details about your educational background.</p></section>`,
        skills: `<section id="skills"><h2>Skills</h2><p>List of your skills.</p></section>`,
        contact: `<section id="contact"><h2>Contact</h2><p>Your contact information.</p></section>`
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const contentKey = event.target.getAttribute('data-content');
            if (sections[contentKey]) {
                mainContent.innerHTML = sections[contentKey];
            }
        });
    });

    // Load the default section
    mainContent.innerHTML = sections['about'];
});


console.log("CSM Portfolio: Initializing...");

const container = document.getElementById("three-container");

try {
    if (!container) {
        throw new Error("3D container not found");
    }

    if (typeof THREE === "undefined") {
        throw new Error("Three.js library not loaded");
    }

    // Create scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    // Remove loading message
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Main geometry
    const geometry = new THREE.IcosahedronGeometry(2.3, 1);

    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: true,
        metalness: 0.8,
        roughness: 0.2
    });

    const object = new THREE.Mesh(geometry, material);
    scene.add(object);

    // Inner geometry
    const innerGeometry = new THREE.OctahedronGeometry(0.8, 1);

    const innerMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        wireframe: true
    });

    const innerObject = new THREE.Mesh(
        innerGeometry,
        innerMaterial
    );

    scene.add(innerObject);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    const light = new THREE.PointLight(0xffffff, 3);
    light.position.set(3, 3, 5);
    scene.add(light);

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        object.rotation.x += 0.002;
        object.rotation.y += 0.003;

        innerObject.rotation.x -= 0.002;
        innerObject.rotation.y += 0.003;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive canvas
    window.addEventListener("resize", () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    });

    console.log("3D Object initialized successfully!");

} catch (error) {
    console.error("3D INITIALIZATION ERROR:", error);

    container.innerHTML = `
        <p style="color: #ff7777; text-align: center;">
            3D rendering error. Check browser console.
        </p>
    `;
}

/* ACTIVE NAVBAR ON SCROLL */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a[href^='#']");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");

            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${currentId}`
                );
            });
        }
    });
}, {
    threshold: 0,
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach((section) => {
    sectionObserver.observe(section);
});

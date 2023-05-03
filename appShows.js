// Create the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

// Create the renderer and add it to the document
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define some constants
const NUM_PARTICLES = 500;

// Create a particle system
const particles = new THREE.Geometry();
for (let i = 0; i < NUM_PARTICLES; i++) {
  const particle = new THREE.Vector3(
    Math.random() * 50 - 25,
    Math.random() * 50 - 25,
    Math.random() * 50 - 25
  );
  particles.vertices.push(particle);
}

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 1,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);

// Define a function to update the particles based on mouse position
function updateParticles(x, y) {
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const particle = particles.vertices[i];
    const dx = particle.x - x;
    const dy = particle.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    particle.x += dx / dist * 1;
    particle.y += dy / dist * 1;

    if (particle.x < -25 || particle.x > 25) {
      particle.x *= -1;
    }

    if (particle.y < -25 || particle.y > 25) {
      particle.y *= -1;
    }

    if (particle.z < -25 || particle.z > 25) {
      particle.z *= -1;
    }
  }

  particles.verticesNeedUpdate = true;
}

// Define a function to handle mouse movement
  function onMouseMove(event) {
  const x = event.clientX / window.innerWidth * 50 - 25;
  const y = event.clientY / window.innerHeight * 50 - 25;

  updateParticles(x, -y);
}

// Add event listeners for mouse movement
document.addEventListener('mousemove', onMouseMove);

// Animate the particle system
function animate() {
  requestAnimationFrame(animate);
  particleSystem.rotation.x += 0.01;
  particleSystem.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Call the animate function to start the animation
animate();
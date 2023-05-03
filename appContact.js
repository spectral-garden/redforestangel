// create a Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create an array of colors for the raindrops
const colors = [
  new THREE.Color(0x00ffff),
  new THREE.Color(0x0000ff),
  new THREE.Color(0x00ff00),
  new THREE.Color(0xff00ff),
  new THREE.Color(0xff0000),
  new THREE.Color(0xffff00)
];

// create a raindrop geometry and material
const raindropGeometry = new THREE.CylinderGeometry(0, 0.1, 0.4, 10);
const raindropMaterial = new THREE.MeshBasicMaterial({ color: colors[0] });

// create an array to store the raindrop meshes
const raindrops = [];

// create 1000 raindrop meshes and add them to the scene
for (let i = 0; i < 1000; i++) {
  const raindropMesh = new THREE.Mesh(raindropGeometry, raindropMaterial.clone());
  raindropMesh.position.set(
    Math.random() * 50 - 25,
    Math.random() * 50 - 25,
    Math.random() * 50 - 25
  );
  raindrops.push(raindropMesh);
  scene.add(raindropMesh);
}

// animate the raindrops
function animate() {
  requestAnimationFrame(animate);

  // loop through the raindrops and update their colors
  for (let i = 0; i < raindrops.length; i++) {
    const colorIndex = Math.floor(Math.random() * colors.length);
    raindrops[i].material.color = colors[colorIndex];
  }

  // render the scene
  renderer.render(scene, camera);
}

animate();


const form = document.getElementById('contact');
const status = document.getElementById('status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    form.reset();
    status.innerHTML = "Thanks for your message! We'll be in touch soon.";
    status.style.color = "red"; // set the color to red
  } catch (error) {
    status.innerHTML = "Oops! There was a problem submitting your message.";
    status.style.color = "red"; // set the color to red
  }
});
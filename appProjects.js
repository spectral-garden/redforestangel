// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a large shining star
const starGeometry = new THREE.SphereGeometry(1, 24, 24);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: false, opacity: 0.8 });
const star = new THREE.Mesh(starGeometry, starMaterial);
scene.add(star);

// Add smaller stars glimmering around the large star
const numStars = 100;
const starField = new THREE.Object3D();
const colorArray = [0xff0000, 0x700000, 0xE06666, 0x990000, 0xE52B2B, 0xFF2929];
for (let i = 0; i < numStars; i++) {
  const starGeometry = new THREE.SphereGeometry(0.1, 10, 10);
  const starMaterial = new THREE.MeshBasicMaterial({ color: colorArray[i % colorArray.length], transparent: true, opacity: 0.5 });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(Math.random() * 2 - 1);
  star.position.set(Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)).multiplyScalar(10);
  starField.add(star);
}
scene.add(starField);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 5.5);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 0, 0);
scene.add(ambientLight);
scene.add(pointLight);

// Animate the stars
function animateStars() {
  star.rotation.y += 0.01;
  starField.rotation.y -= 1.002;
  renderer.render(scene, camera);
  requestAnimationFrame(animateStars);
}
animateStars();

// Update the camera aspect ratio on window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
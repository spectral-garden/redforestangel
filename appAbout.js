// video js
function deferVideo() {

  //defer html5 video loading
$("video source").each(function() {
  var sourceFile = $(this).attr("data-src");
  $(this).attr("src", sourceFile);
  var video = this.parentElement;
  video.load();
 
//video.play();
});

}
window.onload = deferVideo;


// Create a Three.js scene
var scene = new THREE.Scene();

// Create a camera and add it to the scene
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);
scene.add(camera);

// Create a renderer and add it to the document
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a particle system for the smoke
var smokeGeometry = new THREE.BufferGeometry();
var smokeMaterial = new THREE.PointsMaterial({
  color: 0x888888,
  size: 0.5,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

var smokeParticles = new THREE.Points(smokeGeometry, smokeMaterial);

// Add the smoke particles to the scene
scene.add(smokeParticles);

// Animate the smoke
function animateSmoke() {
  var particleCount = 1000;

  var positions = new Float32Array(particleCount * 3);
  var velocities = new Float32Array(particleCount * 3);
  var acceleration = new Float32Array(particleCount * 3);

  for (var i = 0; i < particleCount; i++) {
    positions[i * 3] = Math.random() * 200 - 100;
    positions[i * 3 + 1] = Math.max(Math.random() * 500 - 250, -100); // Clamp y-position to a maximum of 500 and a minimum of -100
    positions[i * 3 + 2] = Math.random() * 200 - 100;

    velocities[i * 3] = Math.random() * 0.5 - 0.25;
    velocities[i * 3 + 1] = Math.random() * 0.5 + 0.5;
    velocities[i * 3 + 2] = Math.random() * 0.5 - 0.25;

    acceleration[i * 3] = 0;
    acceleration[i * 3 + 1] = 0.1;
    acceleration[i * 3 + 2] = 0;
  }

  smokeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  smokeGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  smokeGeometry.setAttribute('acceleration', new THREE.BufferAttribute(acceleration, 3));

  smokeParticles.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animateSmoke);
}

// Call the animateSmoke function to start the animation
animateSmoke();
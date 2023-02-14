const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const rainGeometry = new THREE.Geometry();
for (let i = 0; i < 1000; i++) {
  const rainDrop = new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(10),
    THREE.MathUtils.randFloatSpread(10),
    THREE.MathUtils.randFloatSpread(10)
  );
  rainGeometry.vertices.push(rainDrop);
}

const rainMaterial = new THREE.PointsMaterial({ color: 0x0000ff, size: 0.01 });

const rain = new THREE.Points(rainGeometry, rainMaterial);
scene.add(rain);

function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(rain);
  if (intersects.length > 0) {
    const index = intersects[0].index;
    const rainDrop = rainGeometry.vertices[index];
    rainDrop.y += 0.1;
  } else {
    rainGeometry.vertices.forEach((rainDrop) => {
      if (rainDrop.y < -5) {
        rainDrop.y = THREE.MathUtils.randFloat(10, 20);
        rainDrop.x = THREE.MathUtils.randFloatSpread(10);
        rainDrop.z = THREE.MathUtils.randFloatSpread(10);
      } else {
        rainDrop.y -= 0.1;
      }
    });
  }
  rainGeometry.verticesNeedUpdate = true;
// Set up the colors to cycle through
var colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];


// Set up the text geometry
var fontLoader = new THREE.FontLoader();
fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.121.1/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  var textGeometry = new THREE.TextGeometry("RED FOREST ANGEL", {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  });
  var textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var text = new THREE.Mesh(textGeometry, textMaterial);
  
 // Set up the color change interval
 var colorIndex = 0;
 setInterval(function() {
   textMaterial.color.setHex(colors[colorIndex % colors.length]);
   colorIndex++;
 }, 1000);
 
// Set up the colors to cycle through
var colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

  text.position.y = -2;
  scene.add(text);
});

// Set up the color change interval
var currentColorIndex = 0;
setInterval(function () {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  //fontLoader.color.setHex(colors[currentColorIndex]);
}, 5000);

  renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener("mousemove", onDocumentMouseMove, false);

animate();
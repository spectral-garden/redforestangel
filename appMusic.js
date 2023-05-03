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










const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const colorsArray = [0x000000, 0xFFFFFF, 0xCCCCCC]; // add your colors here
let colorIndex = 0;

function getNextColor() {
  const color = colorsArray[colorIndex];
  colorIndex = (colorIndex + 1) % colorsArray.length;
  return color;
}

setInterval(() => {
  const color = getNextColor();
  rainMaterial.color.setHex(color);
  const colors = rainGeometry.attributes.color;
  for (let i = 0; i < colors.count; i++) {
    colors.setXYZ(i, THREE.Color(color).r, THREE.Color(color).g, THREE.Color(color).b);
  }
  colors.needsUpdate = true;
}, 50);

const rainMaterial = new THREE.PointsMaterial({ size: 1.8, sizeAttenuation: false, vertexColors: true });
const rain = generateRainGeometry();
scene.add(rain);

function generateRainGeometry() {
  const rainGeometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];
  for (let i = 0; i < 100; i++) {
    positions.push(
      THREE.MathUtils.randFloatSpread(10),
      THREE.MathUtils.randFloatSpread(10),
      THREE.MathUtils.randFloatSpread(10)
    );
    const color = new THREE.Color(getNextColor());
    colors.push(color.r, color.g, color.b);
  }
  rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  rainGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  return new THREE.Points(rainGeometry, rainMaterial);
}

function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(rain);
  if (intersects.length > 0) {
    const index = intersects[0].index;
    const position = rain.geometry.attributes.position;
    position.setY(index, position.getY(index) + 0.1);
    position.needsUpdate = true;
  } else {
    const position = rain.geometry.attributes.position;
    const color = rain.geometry.attributes.color;
    for (let i = 0; i < position.count; i++) {
      if (position.getY(i) < -5) {
        position.setY(i, THREE.MathUtils.randFloat(10, 20));
        position.setX(i, THREE.MathUtils.randFloatSpread(10));
        position.setZ(i, THREE.MathUtils.randFloatSpread(10));
        color.setXYZ(i, getNextColor() >> 16, getNextColor() >> 8 & 255, getNextColor() & 255);
      } else {
        position.setY(i, position.getY(i) - 0.1);
      }
    }
    position.needsUpdate = true;
    color.needsUpdate = true;
  }

  renderer.render(scene, camera);
}

// Set up the text geometry
var fontLoader = new THREE.FontLoader();
fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.121.1/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  var textGeometry = new THREE.TextGeometry("dealth", {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xCE6868 });
  var text = new THREE.Mesh(textGeometry, textMaterial);
  text.position.set(-1, 1, -5);
  
  // Set up the color change interval
  var currentColorIndex = 0;
  setInterval(function () {
    currentColorIndex = (currentColorIndex + 1) % colorsArray.length;
    const color = new THREE.Color(colorsArray[currentColorIndex]);
    textMaterial.color = color;
  }, 5);

  scene.add(text);


// Add event listener for mouse movement
document.addEventListener('mousemove', onDocumentMouseMove);

animate();
});

function onDocumentMouseMove(event) {
// Calculate normalized device coordinates (-1 to +1) for mouse position
mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}



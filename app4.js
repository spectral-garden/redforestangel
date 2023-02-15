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

const rainMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, sizeAttenuation: false });
const rain = generateRainGeometry();
scene.add(rain);

function generateRainGeometry() {
  const rainGeometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 100; i++) {
    positions.push(
      THREE.MathUtils.randFloatSpread(10),
      THREE.MathUtils.randFloatSpread(10),
      THREE.MathUtils.randFloatSpread(10)
    );
  }
  rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.Points(rainGeometry, rainMaterial);
}

function animate() {
  requestAnimationFrame( animate );

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(rain);
  if (intersects.length > 0) {
    const index = intersects[0].index;
    const position = rain.geometry.attributes.position;
    position.setY(index, position.getY(index) + 0.1);
    position.needsUpdate = true;
  } else {
    const position = rain.geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      if (position.getY(i) < -5) {
        position.setY(i, THREE.MathUtils.randFloat(10, 20));
        position.setX(i, THREE.MathUtils.randFloatSpread(10));
        position.setZ(i, THREE.MathUtils.randFloatSpread(10));
      } else {
        position.setY(i, position.getY(i) - 0.1);
      }
    }
    position.needsUpdate = true;
  }

  renderer.render( scene, camera );
}

// Set up the text geometry
var fontLoader = new THREE.FontLoader();
fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.121.1/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  var textGeometry = new THREE.TextGeometry("SUPPORT", {
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
  text.position.x = -3;
  text.position.y = -2;
  scene.add(text);
});

// event listener for mouse interaction
function onDocumentMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener('mousemove', onDocumentMouseMove, false);

animate();
// video js
function deferVideo() {

//defer html5 video loading
$("landingpage3web.webm").each(function() {
  var sourceFile = $(this).attr("data-src");
  $(this).attr("src", sourceFile);
  var video = this.parentElement;
  video.load();
 
//video.play();
});

}
window.onload = deferVideo;


//

  // timer
  var countDownSeconds = 10;

  // Update the timer every second
  var timer = setInterval(function() {
    countDownSeconds--;
    document.getElementById("countdown").innerHTML = countDownSeconds;
    
    // Check if the countdown has finished
    if (countDownSeconds <= 0) {
      clearInterval(timer);
      window.location.href = "utopia.html";
    }
  }, 1000);
  
  

// scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//  camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 2;

// Set up the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// colors to cycle through
var colors = [0xff0000, 0x00ff00, 0x9900FF];

// geometry
var treeGeometry = new THREE.TorusKnotBufferGeometry(.3, 0.03, 9, 30);
var treeMaterial = new THREE.MeshBasicMaterial({ color: colors[0] });
var tree = new THREE.Mesh(treeGeometry, treeMaterial);
scene.add(tree);

// text geometry
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
  

// 


 // color change interval
 var colorIndex = 0;
 setInterval(function() {
   textMaterial.color.setHex(colors[colorIndex % colors.length]);
   colorIndex++;
 }, 10);
 


 text.position.x = -3;
  text.position.y = -2;
  scene.add(text);
});

// Set up the color change interval
var currentColorIndex = 0;
setInterval(function () {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  treeMaterial.color.setHex(colors[currentColorIndex]);
}, 50);

// Render loop
function render() {
  requestAnimationFrame(render);

  tree.rotation.x += 0.01;
  tree.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Add an animation to follow the mouse
document.addEventListener('mousemove', function (event) {
  tree.position.x = -(event.clientX / window.innerWidth) * 10 + 5;
  tree.position.y = (event.clientY / window.innerHeight) * 5 - 2.5;
});

// touch move
document.addEventListener('touchmove', function (event) {
  // Get the touch coordinates relative to the window
  var touch = event.changedTouches[0];
  var clientX = touch.clientX;
  var clientY = touch.clientY;

  // Set the position of the tree based on touch coordinates
  tree.position.x = -(clientX / window.innerWidth) * 10 + 5;
  tree.position.y = (clientY / window.innerHeight) * 5 - 2.5;
});

// Start the render loop
render();
//

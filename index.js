// var loader = new THREE.ObjectLoader();
//
// var scene = document.querySelector('a-scene').object3D;
//
// loader.load('assets/sg-shiled-3.json', function(geometry) {
//   var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
//   console.log('mesh', mesh);
//   // mesh.position.x = 0;
//   // mesh.position.y = 0;
//   // mesh.position.z = 0;
//   scene.add(mesh);
//
// });

var scene = document.querySelector('a-scene').object3D;


// var loader = new THREE.OBJLoader();
var loader = new THREE.ObjectLoader();
loader.load('assets/sg-shiled-3.json', function(object) {

  // if you want to add your custom material
  var materialObj = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    overdraw: 0.5
  });
  console.log('materialObj', materialObj);
  object.traverse(function(child) {
    if (child instanceof THREE.Mesh) {
      child.material = materialObj;
    }
  });
  object.scale.set(0.1, 0.1, 0.1);
  object.position.x = 0;
  object.position.y = 1;
  object.position.z = -4;


  // then directly add the object
  scene.add(object);
});
loader.load('assets/sg-sword-13.json', function(object) {

  // if you want to add your custom material
  var materialObj = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    overdraw: 0.5
  });
  console.log('materialObj', materialObj);
  object.traverse(function(child) {
    if (child instanceof THREE.Mesh) {
      child.material = materialObj;
    }
  });
  object.scale.set(0.01, 0.01, 0.01);
  object.position.x = 2;
  object.position.y = 1;
  object.position.z = -4;


  // then directly add the object
  scene.add(object);
});

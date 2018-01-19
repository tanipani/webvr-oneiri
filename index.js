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
/*loader.load('assets/sg-shiled-3.json', function(object) {

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
});*/

AFRAME.registerComponent('model-opacity', {
    console.log("Test");
    schema: {default: 1.0},
    init: function () {
        this.el.addEventListener('model-loaded', this.update.bind(this));
    },
    update: function () {
        var mesh = this.el.getObject3D('mesh');
        var data = this.data;
        if (!mesh) { return; }
        mesh.traverse(function (node) {
            if (node.isMesh) {
                node.material.opacity = data;
                node.material.transparent = data < 1.0;
                node.material.needsUpdate = true;
            }
        });
    }
});

AFRAME.registerComponent('pivot', {
    dependencies: ['position'],

    schema: {type: 'vec3'},

    init: function () {
        var data = this.data;
        var el = this.el;
        var originalParent = el.object3D.parent;
        var originalGroup = el.object3D;
        var outerGroup = new THREE.Group();

        originalPosition.copy(originalGroup.position);
        originalRotation.copy(originalGroup.rotation);

        // Detach current group from parent.
        originalParent.remove(originalGroup);
        outerGroup.add(originalGroup);

        // Set new group as the outer group.
        originalParent.add(outerGroup);

        // Set outer group as new object3D.
        el.object3D = outerGroup;

        // Apply pivot to original group.
        originalGroup.position.set(-1 * data.x, -1 * data.y, -1 * data.z);

        // Offset the pivot so that world position not affected.
        // And restore position onto outer group.
        outerGroup.position.set(data.x + originalPosition.x, data.y + originalPosition.y,
            data.z + originalPosition.z);

        // Transfer rotation to outer group.
        outerGroup.rotation.copy(originalGroup.rotation);
        originalGroup.rotation.set(0, 0, 0);
    }
});
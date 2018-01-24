console.log('Teamwork')

AFRAME.registerComponent('model-opacity', {
  schema: {default: 1.0},
  init: function () {
    console.log(this.el);
    this.el.addEventListener('model-loaded', this.update.bind(this));
  },
  update: function () {
    var mesh = this.el.getObject3D('mesh');
    console.log(this.el.getObject3D('mesh'));
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


document.querySelector('a-scene').addEventListener('enter-vr', function () {
   document.getElementById('cam-entity').setAttribute('position', '0 -1.8 0');
});

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import common from "./Common";
import controls from "./Controls";

export default class Artwork {
  constructor(props) {
    this.flagReverse = false;
    this.props = props;
    this.centerCircle = null;
    this.smallCircles = null;
    this.smallCircleNum = 30;
    this.torusArray = [];
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000.0);
    this.camera.position.set(30, 10, 9);
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
    this.group = new THREE.Group();
    this.group2 = new THREE.Group();
    this.scene.add(this.group);
    // this.uniforms = {
    //   uTime: {
    //     value: 0,
    //   },
    // };

    this.init();
  }

  init() {
    controls.init();
    common.init({
      $wrapper: this.props.$wrapper,
    });
    this.controls = new OrbitControls(this.camera, common.renderer.domElement);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(this.ambientLight);
    const Cylindergeometry = new THREE.CylinderGeometry(0.1, 0.3, 4, 10);
    this.outputMesh2 = new THREE.Mesh(Cylindergeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
    const Cylindergeometry2 = new THREE.CylinderGeometry(0.05, 0.1, 1, 10);
    this.outputMesh3 = new THREE.Mesh(Cylindergeometry2, new THREE.MeshPhongMaterial({ color: 0xffffff }));
    this.outputMesh3.rotation.x = -80;
    this.outputMesh2.position.set(0, 2, 0);
    this.outputMesh3.position.set(0, 4, 0);

    this.scene.add(this.outputMesh2);
    this.scene.add(this.group2);
    for (let i = 0; i < 10; ++i) {
      const angle = (i / 10) * Math.PI * 2;
      const thetaStart = (((360 / 10) * Math.PI) / 180) * i;
      const radius = 10;
      const BLADE_COUNT = 10;
      const PI_2 = Math.PI * 2;
      const x = radius * Math.sin(angle);
      const z = radius * Math.cos(angle);
      this.outputMesh = new THREE.Mesh(
        new THREE.RingGeometry(0.25, 2, 10, 10, (PI_2 / BLADE_COUNT) * i, (PI_2 / 360) * 10),
        new THREE.MeshPhongMaterial({ color: controls.params.color1, side: THREE.DoubleSide })
      );
      this.outputMesh.position.set(0, 0, 0); // Set the position in the x and z coordinates
      this.outputMesh.rotation.x = Math.PI; // Rotate around the x-axis by 180 degrees
      this.outputMesh.lookAt(new THREE.Vector3(0, 0, 0)); // Look towards the origin
      this.group.add(this.outputMesh);
      this.group.position.set(0, 4, 0.5);
      this.torusArray.push(this.outputMesh);
    }
    this.group2.add(this.outputMesh3, this.group);
    this.scene.add(this.group2);
    // const axesBarLength = 20.0;
    // this.axesHelper = new THREE.AxesHelper(axesBarLength);
    // this.scene.add(this.axesHelper);

    this.update();
  }

  resize() {
    common.resize();
  }

  update() {
    common.update();

    // this.uniforms.uTime.value += common.delta;
    common.renderer.setClearColor(0xffffff, 0.0);
    // common.renderer.setRenderTarget(this.fbo);
    common.renderer.render(this.scene, this.camera);
    // this.gaussianBlur.update();
    // common.renderer.setClearColor(controls.params.bgColor);
    // common.renderer.setRenderTarget(null);
    // common.renderer.render(this.outputMesh, this.camera);

    this.group.rotation.z += 0.06;
    // this.group.rotation.y -= 0.3;
    if (this.flagReverse) {
      // this.group.rotation.y -= 0.01;
      this.group2.rotation.y -= 0.01;
    } else {
      // this.group.rotation.y += 0.01;
      this.group2.rotation.y += 0.01;
    }
    if (this.group2.rotation.y > 1) {
      this.flagReverse = true;
    }
    if (this.group2.rotation.y < -1) {
      this.flagReverse = false;
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
}

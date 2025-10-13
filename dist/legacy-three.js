(function () {
  function init() {
    const canvas = document.getElementById("qf-canvas");
    if (!canvas || !window.THREE) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b12, 0.002);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 30, 90);

    // Create the wave geometry
    const ROWS = 100, COLS = 200, WIDTH = 240, HEIGHT = 120;
    const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, COLS, ROWS);
    const material = new THREE.MeshPhongMaterial({
      color: 0x0b1019,
      emissive: 0x0c1220,
      shininess: 25,
      specular: 0x222b45,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2.2;
    scene.add(mesh);

    // Lighting setup
    const ambient = new THREE.AmbientLight(0x5aa9e6, 0.4);
    const keyLight = new THREE.DirectionalLight(0xa78bfa, 0.7);
    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.4);
    keyLight.position.set(60, 120, 40);
    rimLight.position.set(-80, 60, -40);
    scene.add(ambient, keyLight, rimLight);

    // Base vertex positions
    const pos = geometry.attributes.position;
    const baseZ = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) baseZ[i] = pos.getZ(i);

    let t = 0;
    function animate() {
      t += 0.008; // speed
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i) / 18;
        const y = pos.getY(i) / 18;
        const z = Math.sin(x + t) * 0.9 + Math.cos(y * 1.4 - t * 1.2) * 0.6;
        pos.setZ(i, baseZ[i] + z);
      }
      pos.needsUpdate = true;
      mesh.rotation.z += 0.0002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
  }

  // Initialize once page is fully loaded
  window.addEventListener("load", () => {
    if (window.THREE) init();
    else {
      const check = setInterval(() => {
        if (window.THREE) {
          clearInterval(check);
          init();
        }
      }, 100);
    }
  });
})();

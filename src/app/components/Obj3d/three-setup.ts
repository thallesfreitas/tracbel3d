import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

export const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbbbbbb);
  return scene;
};

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.set(-40, 5, 30);
  return camera;
};

export const createRenderer = (mount: any) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);
  return renderer;
};
export const textureLoader = new THREE.TextureLoader();
export const SetObjMaps = async (variableName: any, obj: any) => {
  const mro = "./model/" + variableName + "_occlusionRoughnessMetallic.jpg";
  const normalmap = "./model/" + variableName + "_normal.jpg";

  const metal_ao_ro = textureLoader.load(mro);
  metal_ao_ro.flipY = false;

  const normal = textureLoader.load(normalmap);
  normal.flipY = false;

  obj.metalnessMap = metal_ao_ro;
  obj.roughnessMap = metal_ao_ro;
  obj.normalMap = normal;
  obj.aoMap = metal_ao_ro;
  obj.envMapIntensity = 1;
};
export const mirrorMaterial1 = new THREE.MeshPhysicalMaterial({
  name: "mirrorMaterial",
  color: 0x8e9296,
  metalness: 1,
  reflectivity: 1,
  roughness: 0,
  ior: 22,
  envMapIntensity: 1,
  depthWrite: true,
  //transmission: 0, // use material.transmission for glass materials
  opacity: 1, // set material.opacity to 1 when material.transmission is non-zero
  transparent: false,
});
export const createCube = async (scene: any) => {
  // const hdrTextureURL = new URL("./model/HDR_250.hdr", import.meta.url);
  const hdrTextureURL = "./model/HDR_250.hdr";
  const hdrloader = new RGBELoader();
  await hdrloader.load(hdrTextureURL, function (texture: any) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    //scene.background = texture;
    scene.environment = texture;
  });
  let obj = null;
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
  );
  loader.setDRACOLoader(dracoLoader);
  const loading = await loader.load(
    "./model/escavadeira10.glb",
    (gltf: any) => {
      gltf.scene.position.y = 0;
      const model = gltf.scene;
      model.traverse((child: any) => {
        if (child.material && child.material.name === "BF_BLACK") {
          child.material.metalness = 0.5;
          child.material.roughness = 1;
          SetObjMaps("BF_BLACK", child.material);
        } else if (child.material && child.material.name === "BF_ORANGE") {
          SetObjMaps("BF_ORANGE", child.material);
        } else if (child.material && child.material.name === "PNEUS") {
          //var map = textureLoader.load("./model/PNEUS_SUJO_baseColor.jpg")
          //map.flipY = false
          //child.material.map = map
          SetObjMaps("PNEUS", child.material);
        } else if (child.material && child.material.name === "BODY_ORANGE") {
          SetObjMaps("BODY_ORANGE", child.material);
        } else if (child.material && child.material.name === "BODY_BLACK") {
          child.material.metalness = 0.5;
          child.material.roughness = 1;
          SetObjMaps("BODY_BLACK", child.material);
        } else if (child.material && child.material.name === "BODY_CHROME") {
          SetObjMaps("BODY_CHROME", child.material);
        } else if (child.material && child.material.name === "FRONT_ORANGE") {
          SetObjMaps("FRONT_ORANGE", child.material);
        } else if (child.material && child.material.name === "FRONT_BLACK") {
          child.material.metalness = 0.5;
          child.material.roughness = 1;
          SetObjMaps("FRONT_BLACK", child.material);
        } else if (child.material && child.material.name === "FRONT_CHROME") {
          SetObjMaps("FRONT_CHROME", child.material);
        } else if (child.material && child.material.name === "ND_ORANGE") {
          SetObjMaps("ND_ORANGE", child.material);
        } else if (child.material && child.material.name === "ND_BLACK") {
          child.material.metalness = 0.5;
          child.material.roughness = 1;
          SetObjMaps("ND_BLACK", child.material);
        } else if (child.material && child.material.name === "ND_CHROME") {
          SetObjMaps("ND_CHROME", child.material);
        } else if (child.material && child.material.name === "ND_RUBBER") {
          SetObjMaps("ND_RUBBER", child.material);
        } else if (child.material && child.material.name === "GLASS1") {
          child.material.transparent = true;
        } else if (child.material && child.material.name === "CABINE01") {
          child.material.transparent = false;
        } else if (child.material && child.material.name === "CABINE02") {
          child.material.transparent = false;
        } else if (child.material && child.material.name === "MIRROR") {
          child.material = mirrorMaterial1;
        } else if (child.material && child.material.name === "BODY_GRADE") {
          var map = textureLoader.load("./model/BODY_GRADE_baseColor.jpg");
          map.flipY = false;
          SetObjMaps("BODY_GRADE", child.material);
        } else if (child.material && child.material.name === "lambert2") {
          var alpha = textureLoader.load("./model/shadow.jpg");
          alpha.flipY = false;
          child.material.alphaMap = alpha;
        }
      });
      scene.add(gltf.scene);
      scene.add(model);
      // obj = gltf.scene;
    },
    undefined,
    (error: any) => {
      console.error(error);
    }
  );
  console.log(loading);
  return obj;
  // const geometry = new THREE.BoxGeometry();
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // return new THREE.Mesh(geometry, material);
};

export const animate = (renderer: any, scene: any, camera: any, cube: any) => {
  function animation() {
    const frameId = requestAnimationFrame(animation);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    return frameId; // We're returning the frame ID here
  }
  return animation(); // And initiating the animation here
};

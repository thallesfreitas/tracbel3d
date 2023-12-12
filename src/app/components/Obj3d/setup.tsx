import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

export const MODEL_URL = "./model/escavadeira10.glb";
export const hdrTextureURL = "./model/HDR_250.hdr";
export const DRACO_URL =
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/";

export const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFFFFF);
  return scene;
};

export const createCamera = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const viewport = window.innerWidth;
  if (viewport > 768) {
    const camera = new THREE.PerspectiveCamera(22, aspectRatio, 1, 1000);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    camera.position.set(-10, 5, 180);
    return camera;
  } else {
    const camera = new THREE.PerspectiveCamera(85, aspectRatio, 1, 2000);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    camera.position.set(-10, 5, 120);
    return camera;
  }
};

export const createRenderer = (mount: any) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const viewport = window.innerWidth;
  if (viewport > 768) {
    renderer.setSize(window.innerWidth/1.7, window.innerHeight/1.6);
  } else {
    renderer.setSize(window.innerWidth, window.innerHeight/1.6);
  }  
  mount.innerHTML = "";
  mount.appendChild(renderer.domElement);
  return renderer;
};

export let gltf: any;
export let gltfScene: any;
export const loadEnvironment = async (scene: THREE.Scene) => {
  const hdrloader = new RGBELoader();
  await hdrloader.load(hdrTextureURL, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });
};

export const loadModel = async (scene: THREE.Scene) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(DRACO_URL);
  loader.setDRACOLoader(dracoLoader);

  try {
    gltf = await loader.loadAsync(MODEL_URL);
    gltfScene = gltf.scene;
    gltfScene.position.y = 0;
    gltfScene.position.x = 5000;
    processModel(gltf.scene);
    scene.add(gltf.scene);
  } catch (error) {
    console.error(error);
  }
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
  opacity: 1,
  transparent: false,
});

export const textureLoader = new THREE.TextureLoader();

const configureObjTextures = async (materialName: any, materialObj: any) => {
  const basePath = "./model/";
  const texturePaths = {
    occlusionRoughnessMetallic: `${basePath}${materialName}_occlusionRoughnessMetallic.jpg`,
    normalMap: `${basePath}${materialName}_normal.jpg`,
  };

  Object.entries(texturePaths).forEach(([key, path]) => {
    const texture = textureLoader.load(path);
    texture.flipY = false;
    materialObj[key === "normalMap" ? "normalMap" : "metalnessMap"] = texture;
  });

  materialObj.roughnessMap = materialObj.metalnessMap;
  materialObj.aoMap = materialObj.metalnessMap;
  materialObj.envMapIntensity = 1;
};
const processModel = (model: any) => {
  model.traverse((child: any) => {
    if (child.material) {
      const { name } = child.material;
      const metallicMaterials = [
        "BF_BLACK",
        "BODY_BLACK",
        "FRONT_BLACK",
        "ND_BLACK",
      ];
      const transparentMaterials = ["GLASS1", "CABINE01", "CABINE02"];
      const notTexture = [
        "lambert2",
        "GLASS1",
        "CABINE01",
        "CABINE02",
        "MIRROR",
        "GLASS__ORANGE",
      ];

      if (metallicMaterials.includes(name)) {
        child.material.metalness = 0.5;
        child.material.roughness = 1;
      }

      if (transparentMaterials.includes(name)) {
        child.material.transparent = true;
      }
      if (name === "CABINE01" || name === "CABINE02") {
        child.material.transparent = false;
      }

      if (name === "MIRROR") {
        child.material = mirrorMaterial1;
      } else if (name === "lambert2") {
        const shadowTexture = textureLoader.load("./model/shadow.jpg");
        shadowTexture.flipY = false;
        child.material.alphaMap = shadowTexture;
      } else if (!notTexture.includes(name)) {
        configureObjTextures(name, child.material);
      }
    }
  });
};

export const animate = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  // let startPositionX = 3000;
  // const endPositionX = 0;
  // const duration = 7000;
  // let startTime = null;

  const renderLoop = (time: number) => {
    requestAnimationFrame(renderLoop);
    //TESTES DE ANIMACAO
    // if (gltfScene && time > 3000) {
    if (gltfScene) {
      //   if (!startTime) startTime = time;
      //   const elapsedTime = time - startTime;
      //   const progress = Math.min(elapsedTime / duration, 1);
      // const easedProgress = easeInOutCubic(progress);
      //   const posX =
      //     startPositionX + (endPositionX - startPositionX) * easedProgress;

      gltfScene.position.x = 0;
      //   gltfScene.opacity = easedProgress;
      //   // gltfScene.traverse((node) => {
      //   //   if (node.isMesh && node.material) {
      //   //     console.log(easedProgress);
      //   //     node.material.opacity = easedProgress;
      //   //   }
      //   // });
    }

    renderer.render(scene, camera);
  };

  renderLoop(0);
};

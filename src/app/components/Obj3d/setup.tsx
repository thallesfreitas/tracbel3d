import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

export const MODEL_URL = "./model/escavadeira12.glb";
export const hdrTextureURL = "./model/HDR_250.hdr";
export const DRACO_URL =
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/";

export const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  return scene;
};

export const createCamera = () => {
  const viewport = window.innerWidth;
  const height3d = viewport > 768 ? window.innerHeight * 2 : window.innerHeight;
  const aspectRatio = window.innerWidth / height3d;
  const camera = new THREE.PerspectiveCamera(60, aspectRatio, 1, 1000);
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
  camera.position.set(-10, 5, 180);
  return camera;
  // } else {
  //   const camera = new THREE.PerspectiveCamera(85, aspectRatio, 1, 2000);
  //   camera.aspect = aspectRatio;
  //   camera.updateProjectionMatrix();
  //   camera.position.set(-10, 5, 120);
  //   return camera;
  // }
};

export const createRenderer = (mount: any) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const viewport = window.innerWidth;
  const height3d = viewport > 768 ? window.innerHeight * 2 : window.innerHeight;
  renderer.setSize(window.innerWidth, height3d);
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
    // gltfScene.position.y = 10;
    // gltfScene.position.x = 5000;
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
      } else if (child.material && child.material.name === "LOGO_BULL") {
        var alpha = textureLoader.load("./model/Bull_logo.png");
        alpha.flipY = false;
        child.material.map = alpha;
      } else if (child.material && child.material.name === "LOGOS") {
        var alpha = textureLoader.load("./model/sticker1.png");
        alpha.flipY = false;
        child.material.map = alpha;
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
  camera: THREE.PerspectiveCamera,
  control3dactive = false
) => {
  // let startPositionX = 3000;
  // const endPositionX = 0;
  // const duration = 7000;
  // let startTime = null;
  // console.log("control3dactive");
  // console.log(control3dactive);
  // const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  // const points = [];
  // points.push(new THREE.Vector3(3, 0, 0)); // Ponto inicial
  // points.push(new THREE.Vector3(10, 10, 10)); // Ponto final
  // const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // const line = new THREE.Line(geometry, material);
  // scene.add(line);

  const renderLoop = (time: number) => {
    requestAnimationFrame(renderLoop);

    if (gltfScene) {
      // if (control3dactive) {
      //   gltfScene.rotation.y += 0.01;
      // }

      const objectPosition = new THREE.Vector3();

      gltfScene.getWorldPosition(objectPosition);

      // Atualiza o segundo ponto da linha
      // line.geometry.attributes.position.array[0] = objectPosition.x;
      // line.geometry.attributes.position.array[1] = objectPosition.y;
      // line.geometry.attributes.position.array[2] = objectPosition.z;
      // line.geometry.attributes.position.needsUpdate = true;

      // gltfScene.getWorldPosition(objectPosition);
      // const verticeGlobal = objectPosition.applyMatrix4(gltfScene.matrixWorld);

      // Atualiza a posição final da linha
      // line.geometry.attributes.position.array[3] = objectPosition.x;
      // line.geometry.attributes.position.array[4] = objectPosition.y;
      // line.geometry.attributes.position.array[5] = objectPosition.z;
      // line.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  };
  requestAnimationFrame(renderLoop);
  renderLoop(0);
};

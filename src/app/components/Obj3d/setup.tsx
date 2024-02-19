import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

export const MODEL_URL = "./model/escavadeira12.glb";
export const hdrTextureURL = "./model/HDR_250.hdr";
export const DRACO_URL =
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/";

export const createScene = () => {
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xffffff);
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
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const viewport = window.innerWidth;
  const height3d = viewport > 768 ? window.innerHeight * 2 : window.innerHeight;
  renderer.setSize(window.innerWidth, height3d);
  renderer.setClearColor(0xffffff, 0);
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
  camera: THREE.PerspectiveCamera
) => {
  drawLine(renderer, scene, camera, new THREE.Vector3(0, 2.95, 0), new THREE.Vector3(0.1, 0.35, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(2.8, 2.2, 0), new THREE.Vector3(0.65, 0.27, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(2.4, 1.5, 0), new THREE.Vector3(0.65, 0.12, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(1.3, 0.5, 1.68), new THREE.Vector3(0.6, -0.13, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(1.4, 0.1, 1.9), new THREE.Vector3(0.6, -0.23, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(-0.05, 0.7, 1), new THREE.Vector3(0.05, -0.23, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(-2.1, 0.5, 1.15), new THREE.Vector3(-0.3, -0.23, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(-3.4, 0.8, 0), new THREE.Vector3(-0.65, 0.05, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(-2.1, 1.7, 0), new THREE.Vector3(-0.43, 0.25, -1));
  drawLine(renderer, scene, camera, new THREE.Vector3(-1.6, 1.86, 0), new THREE.Vector3(-0.25, 0.25, -1));
};

export const drawLine = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera, 
  initialPosition: THREE.Vector3, 
  finalPosition: THREE.Vector3
) => {
  const color        = 0xe6ce58; // Cor da linha e ponto
  const materialLine = new THREE.LineBasicMaterial({ color: color }); // Material da linha
  const materialDot  = new THREE.PointsMaterial({ color: color, size: 10, sizeAttenuation: false }); // Material do ponto

  // Posição inicial e final da linha
  const positions = [
    initialPosition,
    finalPosition,
  ];
  
  const geometryLine = new THREE.BufferGeometry().setFromPoints(positions); // Geometria da linha
  const geometryDot  = new THREE.BufferGeometry().setFromPoints([initialPosition]); // Geometria do ponto

  const line = new THREE.Line(geometryLine, materialLine); // Cria linha
  const dot  = new THREE.Points(geometryDot, materialDot); // Cria ponto
  
  scene.add(line); // Adiciona linha a cena
  scene.add(dot); // Adiciona ponto a cena

  // Loop para atualizar o ponto fixo da linha
  const renderLoop = () => {
    requestAnimationFrame(renderLoop);

    const vector    = new THREE.Vector3();
    const positions = line.geometry.attributes.position.array; // Obtém posições da linha

    vector.set(finalPosition.x, finalPosition.y, finalPosition.z).unproject(camera); // Converte coordenadas da tela para coordenadas 3D
    
    // Atualiza posição final da linha
    positions[3] = vector.x; 
    positions[4] = vector.y; 
    positions[5] = vector.z; 
    
    line.geometry.attributes.position.needsUpdate = true; // Necessita ser atualizada

    renderer.render(scene, camera);
  };

  requestAnimationFrame(renderLoop);
  renderLoop();
};

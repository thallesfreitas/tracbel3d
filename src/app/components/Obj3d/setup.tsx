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
  camera: THREE.PerspectiveCamera,
  control3dactive = false
) => {
  let startPositionX = 3000;
  const endPositionX = 0;
  const duration = 7000;
  let startTime = null;
  console.log("control3dactive");
  console.log(control3dactive);
  const material = new THREE.LineBasicMaterial({ color: 0xe6ce58 });

  // Linha 1
  const points = [];
  points.push( new THREE.Vector3( 0, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 3, 0 ) );
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);
  // scene.add(line);

  // Linha 2
  const points2 = [];
  points2.push( new THREE.Vector3( 0, 0, 0 ) );
  points2.push( new THREE.Vector3( 1.75, 3, 0 ) );
  const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);

  const line2 = new THREE.Line(geometry2, material);
  scene.add(line2);

  var dotGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3( 0, 3, 0 )]);
  var dotMaterial = new THREE.PointsMaterial( { color: 0x0000ff, size: 10, sizeAttenuation: false } );
  var dot = new THREE.Points( dotGeometry, dotMaterial );
  scene.add( dot );

  var dotGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3( 1.75, 3, 0 )]);
  var dotMaterial = new THREE.PointsMaterial( { color: 0x0000ff, size: 10, sizeAttenuation: false } );
  var dot = new THREE.Points( dotGeometry, dotMaterial );
  scene.add( dot );

  drawLine(renderer, scene, camera, new THREE.Vector3(0, 3, 0), new THREE.Vector3(-0.5, 0.5, -1));

  const renderLoop = (time: number) => {
    requestAnimationFrame(renderLoop);

    // var new_position = new THREE.Vector3( 0, 10, -1 ).unproject( camera );
    // var positions = line.geometry.attributes.position.array;
    // positions[0] = new_position.x; 
    // positions[1] = new_position.y; 
    // positions[2] = new_position.z; 
    // // geometry.verticesNeedUpdate = true;

    // // geometry.setFromPoints(camera.position);
    // line.geometry.attributes.position.needsUpdate = true; // required after the first render

    var vector = new THREE.Vector3();
    // Top left corner
    vector.set( -0.5, 0.5, -1 ).unproject( camera );

    var positions = line.geometry.attributes.position.array;
    positions[0] = vector.x; 
    positions[1] = vector.y; 
    positions[2] = vector.z; 
    
    line.geometry.attributes.position.needsUpdate = true; // required after the first render

    var vector = new THREE.Vector3();
    // Top left corner
    vector.set( 0.5, 0.5, -1 ).unproject( camera );

    var positions2 = line2.geometry.attributes.position.array;
    positions2[0] = vector.x; 
    positions2[1] = vector.y; 
    positions2[2] = vector.z; 
    
    line2.geometry.attributes.position.needsUpdate = true; // required after the first render

    renderer.render(scene, camera);
  };
  requestAnimationFrame(renderLoop);
  renderLoop(0);
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

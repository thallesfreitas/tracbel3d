"use client";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  animate,
  createCamera,
  createCube,
  createRenderer,
  createScene,
} from "./three-setup";
export default function ThreeScene() {
  const mountRef = useRef(null);
  const cubeRef = useRef(null);
  let frameId: any;
  useEffect(() => {
    const scene = createScene();
    const camera = createCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    const renderer = createRenderer(mountRef.current);
    // window.addEventListener("resize", onWindowResize, false);
    const load = async () => {
      const cube = await createCube(scene);
      cubeRef.current = cube;

      frameId = await animate(renderer, scene, camera, cube);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 5;
      controls.maxDistance = 8;
      controls.enablePan = false;
      controls.maxPolarAngle = Math.PI / 2;
      controls.target.set(-0.8, 1.15, 0);
      if (controls) controls.update();
    };
    load();
    return () => {
      // if (mountRef.current) {
      //   mountRef.current.removeChild(renderer.domElement);
      // }
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={mountRef} />
      {/* <Button
        className="absolute z-1 top-0"
        onClick={() => cubeRef.current.material.color.set(0xff0000)}
      >
        Change Color
      </Button> */}
    </>
  );
}

// export default ThreeScene;

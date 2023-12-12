"use client";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  animate,
  createCamera,
  createRenderer,
  createScene,
  loadEnvironment,
  loadModel,
} from "./setup";

export default function ThreeScene() {
  const mountRef = useRef(null);
  useEffect(() => {
    console.log("Teste")
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer(mountRef.current);

    loadEnvironment(scene).then(() => {
      loadModel(scene);
    });

    animate(renderer, scene, camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 12;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(-0.8, 1.15, 0);
    if (controls) controls.update();

    return () => renderer.dispose();
  }, []);

  console.log("Teste 2")

  return <div className="class-teste" ref={mountRef} />;
}

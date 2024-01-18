"use client";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  animate,
  createCamera,
  createRenderer,
  createScene,
  loadEnvironment,
  loadModel,
} from "./setup";

interface ThreeSceneProps {
  control3dactive: boolean;
}
export default function ThreeScene({ control3dactive }: ThreeSceneProps) {
  const mountRef = useRef(null);
  const [controls, setControls] = useState<OrbitControls | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  // const scene = createScene();
  // const camera = createCamera();

  useEffect(() => {
    const sceneStart = createScene();
    const cameraStart = createCamera();
    loadEnvironment(sceneStart).then(() => {
      loadModel(sceneStart);
    });

    const renderStart = createRenderer(mountRef.current);

    animate(renderStart, sceneStart, cameraStart, control3dactive);
    const orbitControls = new OrbitControls(
      cameraStart,
      renderStart.domElement
    );
    orbitControls.minDistance = 8;
    orbitControls.maxDistance = 12;
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 2;
    orbitControls.target.set(-0.8, 1.15, 0);

    orbitControls.enabled = control3dactive;
    orbitControls.update();

    setControls(orbitControls);
    setRenderer(renderStart);
    setScene(sceneStart);
    setCamera(cameraStart);

    return () => renderStart.dispose();
  }, []);
  useEffect(() => {
    if (controls) {
      controls.enabled = control3dactive;
      controls.update();
      animate(
        renderer as THREE.WebGLRenderer,
        scene as THREE.Scene,
        camera as THREE.PerspectiveCamera,
        control3dactive
      );
    }
  }, [control3dactive, controls]);

  return (
    <>
      {!control3dactive && (
        <div className="class-teste w-full h-[100vh] absolute md:top-[80vh] top-[60vh] z-10"></div>
      )}
      <div
        className="class-teste w-full h-[100vh] z-0 absolute md:top-[80vh] top-[60vh]"
        ref={mountRef}
      />
    </>
  );
}

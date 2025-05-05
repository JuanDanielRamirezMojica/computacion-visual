import React from "react";
import { useGLTF } from "@react-three/drei";

export default function PhoneGLTF(props) {
  const { scene } = useGLTF("/PhoneGLTF.gltf");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/PhoneGLTF.gltf");
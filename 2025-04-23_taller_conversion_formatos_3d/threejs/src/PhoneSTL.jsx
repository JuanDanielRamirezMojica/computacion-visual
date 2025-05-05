import React from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export default function PhoneSTL(props) {
  const geometry = useLoader(STLLoader, "/PhoneSTL.stl");
  return (
    <mesh geometry={geometry} {...props}>
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
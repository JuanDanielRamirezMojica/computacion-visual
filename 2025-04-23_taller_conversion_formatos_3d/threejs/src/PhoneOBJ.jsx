import React from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function PhoneOBJ(props) {
  const obj = useLoader(OBJLoader, "/PhoneOBJ.obj");
  return <primitive object={obj} {...props} />;
}
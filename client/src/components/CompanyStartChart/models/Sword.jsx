import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/sword.gltf");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Maria_J_J_Ong"
            geometry={nodes.Maria_J_J_Ong.geometry}
            material={materials["MariaMat.002"]}
            skeleton={nodes.Maria_J_J_Ong.skeleton}
          />
          <skinnedMesh
            name="Maria_sword"
            geometry={nodes.Maria_sword.geometry}
            material={materials["MariaMat.002"]}
            skeleton={nodes.Maria_sword.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/sword.gltf");

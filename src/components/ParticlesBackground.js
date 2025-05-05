"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      options={{
        fullScreen: { enable: false },
        particles: {
          number: {
            value: 50,
            density: { enable: true, area: 800 },
          },
          color: { value: "#ed8936" },
          shape: { type: "circle" },
          opacity: {
            value: 0.6,
            anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false },
          },
          size: {
            value: 4,
            random: true,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outMode: "bounce",
          },
        },
        detectRetina: true,
      }}
    />
  );
}

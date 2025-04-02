import Fireworks from "fireworks-js";

// 🎆 Fireworks
export function triggerFireworks(container) {
    console.log("Fireworks triggered!");
    const fireworksContainer = document.createElement("div");
    fireworksContainer.id = "fireworksContainer";
    Object.assign(fireworksContainer.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "9999",
    });
    container.appendChild(fireworksContainer);
    
    const fireworks = new Fireworks(fireworksContainer, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.98,
      gravity: 1.5,
      particles: 150,
      trace: 3,
      explosion:  10,
      intensity:  50,
      flickering: 50,
      lineWidth: {
        trace: 2,
        explosion: 4,
      },
      brightness: {
        min:  50,
        max: 80,
        decay: { min: 0.015, max: 0.03 },
      },
      hue: { min: 0, max: 360 },
      delay: { min: 30, max: 60 },
    });
  
    fireworks.start();
    setTimeout(() => fireworks.stop(), 5000);
  }
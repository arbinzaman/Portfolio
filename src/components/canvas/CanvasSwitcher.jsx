import React, { useState } from "react";
import BallCanvas from "./Ball";
import ComputersCanvas from "./Computers";
import EarthCanvas from "./Earth";
import StarsCanvas from "./Stars";

const CanvasSwitcher = () => {
  const [active, setActive] = useState("computers"); // default selected canvas

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setActive("ball")}>Ball</button>
        <button onClick={() => setActive("computers")}>Computers</button>
        <button onClick={() => setActive("earth")}>Earth</button>
        <button onClick={() => setActive("stars")}>Stars</button>
      </div>

      {/* Only one canvas rendered at a time */}
      {active === "ball" && <BallCanvas icon="/path-to-your-icon.png" />}
      {active === "computers" && <ComputersCanvas />}
      {active === "earth" && <EarthCanvas />}
      {active === "stars" && <StarsCanvas />}
    </div>
  );
};

export default CanvasSwitcher;

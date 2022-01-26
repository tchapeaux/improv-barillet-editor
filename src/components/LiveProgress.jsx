import React, { useState, useRef, useEffect } from "react";

export default function LiveProgress({ barillet, alreadySeenIds }) {
  return (
    <p className="live-progress">
      Vues: {alreadySeenIds.size} / Restantes :
      {barillet.length - alreadySeenIds.size}
    </p>
  );
}

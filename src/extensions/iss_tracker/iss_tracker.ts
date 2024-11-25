import html from "@distui/iss_tracker/main/index.html?raw";

import { GlobalThis } from "@/shared/reearthTypes";

const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html);

// Get message from UI
// eslint-disable-next-line @typescript-eslint/no-explicit-any
reearth.extension.on("message", (msg: { action: string; payload?: any }) => {
  if (msg.action === "flyTo") {
    reearth.camera.flyTo(
      {
        lat: msg.payload.lat,
        lng: msg.payload.lon,
        height: msg.payload.height,
      },
      { duration: 1 }
    );
  }
});

const manifest = {
  bundles: [
    {
      name: "assets",
      assets: [
        {
          name: "diffuse",
          srcs: "assets/chromatic/diffuse.cubemap", // Diffuse cubemap for image-based lighting
        },
        {
          name: "specular",
          srcs: "assets/chromatic/specular.cubemap", // Specular cubemap for image-based lighting
        },
        {
          name: "justVegas",
          srcs: "assets/models/just-vegas-1.glb", // Just Vegas model in GLB format
        },
      ],
    },
  ],
};

export { manifest };

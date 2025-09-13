/// <reference path='../global.d.ts' />

import { Application, Assets, Renderer } from "pixi.js";
import {
  CameraOrbitControl,
  LightingEnvironment,
  ImageBasedLighting,
  Model,
  Mesh3D,
  Light,
  LightType,
  ShadowCastingLight,
  ShadowQuality,
} from "pixi3d/pixi7";

(async () => {
  // Create and initialize the application
  let app = new Application({
    backgroundColor: 0x000000,
    resizeTo: window,
    antialias: true,
  });

  // Append the application canvas to the document body
  document.body.appendChild(app.view as HTMLCanvasElement);

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

  await Assets.init({ manifest });
  let assets = await Assets.loadBundle("assets");

  // Load and position the "just vegas" model
  let model1 = app.stage.addChild(Model.from(assets["justVegas"]));
  model1.y = -1;
  model1.x = -2;

  // Create a ground plane for the scene
  let ground = app.stage.addChild(Mesh3D.createPlane());
  ground.y = -0.8;
  ground.scale.set(10, 1, 10);

  // Set up image-based lighting with diffuse and specular cubemaps
  LightingEnvironment.main.imageBasedLighting = new ImageBasedLighting(
    assets.diffuse,
    assets.specular
  );

  // Create a directional light source
  let directionalLight = new Light();
  directionalLight.intensity = 1;
  directionalLight.type = LightType.directional;
  directionalLight.rotationQuaternion.setEulerAngles(25, 120, 0);
  LightingEnvironment.main.lights.push(directionalLight);

  // Set up shadow casting for the directional light
  let shadowCastingLight = new ShadowCastingLight(
    app.renderer as Renderer,
    directionalLight,
    { shadowTextureSize: 1024, quality: ShadowQuality.medium }
  );
  shadowCastingLight.softness = 1;
  shadowCastingLight.shadowArea = 15;

  // Enable shadows for the ground, model, and justVegas models
  let pipeline = app.renderer.plugins.pipeline;
  pipeline.enableShadows(ground, shadowCastingLight);
  pipeline.enableShadows(model1, shadowCastingLight);

  // Initialize camera orbit control
  let control = new CameraOrbitControl(app.view as HTMLCanvasElement);
})();

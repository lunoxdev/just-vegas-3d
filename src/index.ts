/// <reference path='../global.d.ts' />

import { Application, Assets, Renderer } from "pixi.js";
import {
  CameraOrbitControl,
  LightingEnvironment,
  ImageBasedLighting,
  Model,
  Light,
  LightType,
  ShadowCastingLight,
  ShadowQuality,
} from "pixi3d/pixi7";
import { manifest } from "./manifest";

(async () => {
  // Create and initialize the application
  const app = new Application({
    backgroundColor: 0x000000,
    resizeTo: window,
    antialias: true,
  });

  // Append the application canvas to the document body
  document.body.appendChild(app.view as HTMLCanvasElement);

  await Assets.init({ manifest });
  const assets = await Assets.loadBundle("assets");

  // Hide the loading spinner
  const loadingSpinner = document.querySelector(
    ".loading-spinner"
  ) as HTMLElement;
  if (loadingSpinner) {
    loadingSpinner.style.display = "none";
  }

  // Load and position the "just vegas" model
  const model1 = app.stage.addChild(Model.from(assets["justVegas"]));
  model1.y = -0.8;
  model1.x = 0;
  model1.scale.set(0.006); // Further reduce the size of the model

  // Set up image-based lighting with diffuse and specular cubemaps
  LightingEnvironment.main.imageBasedLighting = new ImageBasedLighting(
    assets.diffuse,
    assets.specular
  );

  // Create a directional light source
  const directionalLight = new Light();
  directionalLight.intensity = 1;
  directionalLight.type = LightType.directional;
  directionalLight.rotationQuaternion.setEulerAngles(25, 120, 0);
  LightingEnvironment.main.lights.push(directionalLight);

  // Set up shadow casting for the directional light
  const shadowCastingLight = new ShadowCastingLight(
    app.renderer as Renderer,
    directionalLight,
    { shadowTextureSize: 1024, quality: ShadowQuality.medium }
  );
  shadowCastingLight.softness = 1;
  shadowCastingLight.shadowArea = 15;

  // Enable shadows for the ground, model, and justVegas models
  const pipeline = app.renderer.plugins.pipeline;
  pipeline.enableShadows(model1, shadowCastingLight);

  // Initialize camera orbit control
  const control = new CameraOrbitControl(app.view as HTMLCanvasElement);
  control.angles.x = 20;
})();

import { ManifestLoader } from "../loader/ManifestLoader.js";

const loader = new ManifestLoader();

const manifest = loader.load("./knowledge/manifest.yaml");

console.log(manifest);
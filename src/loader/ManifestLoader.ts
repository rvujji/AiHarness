import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

import type { Manifest } from "../contracts/Manifest.js";

export class ManifestLoader {

    load(filePath: string): Manifest {

        const absolutePath = path.resolve(filePath);

        if (!fs.existsSync(absolutePath)) {
            throw new Error(`Manifest not found: ${absolutePath}`);
        }

        const fileContent = fs.readFileSync(absolutePath, "utf8");

        const manifest = YAML.parse(fileContent) as Manifest;

        return manifest;
    }

}
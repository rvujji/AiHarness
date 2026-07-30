import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export class YamlLoader {

    static load<T>(filePath: string): T {

        const absolutePath = path.resolve(filePath);

        if (!fs.existsSync(absolutePath)) {
            throw new Error(`YAML file not found: ${absolutePath}`);
        }

        const content = fs.readFileSync(absolutePath, "utf8");

        return YAML.parse(content) as T;
    }

}
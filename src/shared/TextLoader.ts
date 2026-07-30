import fs from "node:fs";
import path from "node:path";

export class TextLoader {

    static load(filePath: string): string {

        const absolutePath = path.resolve(filePath);

        if (!fs.existsSync(absolutePath)) {
            throw new Error(`File not found: ${absolutePath}`);
        }

        return fs.readFileSync(
            absolutePath,
            "utf8"
        );

    }

}
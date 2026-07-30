export class TextUtils {

    static tokenCount(text: string): number {
        return text
            .trim()
            .match(/\S+/g)?.length ?? 0;

    }

}
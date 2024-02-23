import { App } from "@/app/App";
import { Slide } from "./Slide";
export declare class TextSlide extends Slide {
    private text;
    constructor(app: App, text: [string, ...string[]]);
    get assetManifest(): {
        assets: {};
    };
    protected start(): Promise<void>;
}

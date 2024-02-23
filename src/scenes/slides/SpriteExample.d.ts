import { Slide } from "./Slide";
export declare class SpriteExample extends Slide {
    get assetManifest(): {
        assets: {
            balloon: string;
        };
    };
    protected start(): Promise<void>;
}

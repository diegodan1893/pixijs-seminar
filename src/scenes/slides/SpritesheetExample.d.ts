import { Slide } from "./Slide";
export declare class SpritesheetExample extends Slide {
    get assetManifest(): {
        assets: {
            doorImage: string;
        };
    };
    protected start(): Promise<void>;
}

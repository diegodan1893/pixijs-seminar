import { Slide } from "./Slide";
export declare class AnimationsExample extends Slide {
    get assetManifest(): {
        assets: {
            blue: string;
            noWait: string;
            withWait: string;
            interpolator: string;
            rotate: string;
        };
    };
    protected start(): Promise<void>;
}

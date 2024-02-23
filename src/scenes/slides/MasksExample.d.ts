import { Slide } from "./Slide";
export declare class MasksExample extends Slide {
    get assetManifest(): {
        assets: {
            balloon: string;
            mask: string;
        };
    };
    protected start(): Promise<void>;
}

import { Slide } from "./Slide";
export declare class Tree extends Slide {
    get assetManifest(): {
        assets: {
            blue: string;
            orange: string;
        };
    };
    protected start(): Promise<void>;
}

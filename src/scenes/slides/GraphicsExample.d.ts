import { Slide } from "./Slide";
export declare class GraphicsExample extends Slide {
    get assetManifest(): {
        assets: {
            graphics: string;
        };
    };
    protected start(): Promise<void>;
}

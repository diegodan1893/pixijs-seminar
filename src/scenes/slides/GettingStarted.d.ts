import { Slide } from "./Slide";
export declare class GettingStarted extends Slide {
    get assetManifest(): {
        assets: {
            balloon: string;
            html: string;
            createApp: string;
            addBallon: string;
            addAnimation: string;
        };
    };
    protected start(): Promise<void>;
}

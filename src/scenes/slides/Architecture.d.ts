import { Slide } from "./Slide";
export declare class Architecture extends Slide {
    get assetManifest(): {
        assets: {
            umlAppEntity: string;
            umlAppSceneEntity: string;
            app: string;
            balloonEntity: string;
        };
    };
    protected start(): Promise<void>;
}

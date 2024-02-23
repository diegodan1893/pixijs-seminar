import { Slide } from "./Slide";
export declare class Title extends Slide {
    get assetManifest(): {
        assets: {
            pixijsLogo: string;
        };
    };
    transitionIn(): Promise<void>;
    protected init(): Promise<void>;
}

import { Scene } from "./Scene";
export declare class Throbber extends Scene {
    private showTimeout?;
    private showDelaySeconds;
    get assetManifest(): {
        assets: {
            throbberImage: string;
        };
    };
    protected init(): Promise<void>;
    skipAllTransitions(): void;
    transitionIn(): Promise<void>;
    transitionOut(): Promise<void>;
}

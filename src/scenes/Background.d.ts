import { Scene } from "./Scene";
import { App } from "@/app/App";
export declare class Backgorund extends Scene {
    private backgroundGraphics;
    private logoMargin;
    constructor(app: App);
    get assetManifest(): {
        assets: {
            celtiberianLogo: string;
        };
    };
    protected init(): Promise<void>;
    protected deinit(): Promise<void>;
}

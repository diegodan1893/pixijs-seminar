import { App } from "@/app/App";
import { Slide } from "./Slide";
export declare class ShadersExample extends Slide {
    private from;
    private to;
    private transition;
    private lifetimeSeconds;
    private transitionDurationSeconds;
    private paused;
    private filter?;
    private resultContainer?;
    constructor(app: App, from: string, to: string, transition: string);
    get assetManifest(): {
        assets: {
            from: string;
            to: string;
            transition: string;
        };
    };
    transitionOut(): Promise<void>;
    protected start(): Promise<void>;
    protected tick(elapsedSeconds: number): void;
}

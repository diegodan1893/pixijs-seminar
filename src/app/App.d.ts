import { AssetManager } from "./AssetManager";
interface ApplicationOptions {
    canvasElementId: string;
    width: number;
    height: number;
}
export declare class App {
    private options;
    private pixiApp;
    private canvas;
    private persistentScenes;
    private slides;
    private _openSlideIndex;
    private transientSceneStage;
    private currentScene?;
    private nextScene?;
    private _assetManager;
    private initialized;
    constructor(options: ApplicationOptions);
    get width(): number;
    get height(): number;
    get halfWidth(): number;
    get halfHeight(): number;
    get assetManager(): AssetManager;
    get openSlideIndex(): number;
    set openSlideIndex(index: number);
    init(): Promise<void>;
    travelTo(slideIndex: number): Promise<void>;
    waitForClick(): Promise<void>;
    private update;
    private handleWindowResize;
}
export {};

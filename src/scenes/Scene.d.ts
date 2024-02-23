import { Assets, Container, DisplayObject } from "pixi.js";
import { Entity } from "@/entities/Entity";
import { App } from "@/app/App";
export interface SceneAssets {
    assets: Record<string, string>;
}
export declare abstract class Scene extends Entity {
    protected app: App;
    protected defaultTransitionDurationSeconds: number;
    protected assets: Awaited<ReturnType<typeof Assets.loadBundle>>;
    protected entities: Set<Entity>;
    constructor(app: App);
    abstract get assetManifest(): SceneAssets;
    load(): Promise<void>;
    unload(): Promise<void>;
    removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
    transitionIn(): Promise<void>;
    transitionOut(): Promise<void>;
    update(elapsedSeconds: number): void;
    protected init(): Promise<void>;
    protected deinit(): Promise<void>;
    protected addEntity(entity: Entity, parent?: Container): void;
    protected removeEntity(entity: Entity): void;
}

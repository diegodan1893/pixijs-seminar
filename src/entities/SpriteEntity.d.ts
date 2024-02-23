import { Sprite, Texture } from "pixi.js";
import { Entity } from "./Entity";
export declare class SpriteEntity extends Entity {
    private _sprite;
    constructor(texture: Texture);
    get sprite(): Sprite;
}

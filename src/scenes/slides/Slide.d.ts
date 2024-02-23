import { Point, TextStyle, Texture } from "pixi.js";
import { Scene } from "../Scene";
import { TextEntity } from "@/entities/TextEntity";
import { SpriteEntity } from "@/entities/SpriteEntity";
export declare abstract class Slide extends Scene {
    private titlePosition;
    private nextContentLinePosition;
    private contentLineSpacing;
    private slideDistance;
    private slideDurationSeconds;
    private slideWaitSeconds;
    private titleStyle;
    private contentStyle;
    transitionIn(): Promise<void>;
    protected start(): Promise<void>;
    protected addTitle(text: string): Promise<TextEntity>;
    protected addContentLine(text: string): Promise<TextEntity>;
    protected addText(text: string, style: Partial<TextStyle>, position: Point): Promise<TextEntity>;
    protected showLeftAlignedImage(texture: Texture, hideOnClick?: boolean): Promise<SpriteEntity>;
    protected showImage(texture: Texture, anchor: Point, position: Point, hideOnClick?: boolean): Promise<SpriteEntity>;
    private runAndGoToNext;
}

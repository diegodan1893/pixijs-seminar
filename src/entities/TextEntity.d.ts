import { ITextStyle, Text } from "pixi.js";
import { Entity } from "./Entity";
export declare class TextEntity extends Entity {
    private _text;
    constructor(text: string, style: Partial<ITextStyle>);
    get text(): Text;
}

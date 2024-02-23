import { Container } from "pixi.js";
import { Interpolator } from "./Interpolator";
import { Bezier } from "bezier-js";
export declare class Entity extends Container {
    protected interpolators: Set<Interpolator>;
    constructor();
    get halfWidth(): number;
    get halfHeight(): number;
    fade(targetAlpha: number, durationSeconds: number, easingFunction?: (x: number) => number): Promise<void>;
    move(x: number, y: number, durationSeconds: number, easingFunction?: (x: number) => number): Promise<void>;
    followPath(bezier: Bezier, durationSeconds: number, easingFunction?: (x: number) => number): Promise<void>;
    resize(x: number, y: number, durationSeconds: number, easingFunction?: (x: number) => number): Promise<void>;
    rotate(targetAngle: number, durationSeconds: number, easingFunction?: (x: number) => number): Promise<void>;
    skipAllTransitions(): void;
    update(elapsedSeconds: number): void;
    protected tick(elapsedSeconds: number): void;
}

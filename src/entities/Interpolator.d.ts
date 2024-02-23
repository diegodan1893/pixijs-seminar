export declare class Interpolator {
    private startValue;
    private endValue;
    private durationSeconds;
    private onUpdate;
    private onEnd;
    private easingFunction;
    private runTimeSeconds;
    constructor(startValue: number, endValue: number, durationSeconds: number, onUpdate: (interpolatedValue: number) => void, onEnd?: () => void, easingFunction?: (progress: number) => number);
    get ended(): boolean;
    update(elapsedSeconds: number): void;
    skip(): void;
}

export declare const randomInRange: (start: number, end: number) => number;
export declare const shuffle: <T>(array: T[]) => T[];
export declare const randomInList: <T>(list: T[]) => T;
export interface ItemWithChance<T> {
    value: T;
    chance: number;
}
export declare const weightedRandomSelection: <T>(items: ItemWithChance<T>[]) => T;
export declare const randomBool: (chance: number) => boolean;

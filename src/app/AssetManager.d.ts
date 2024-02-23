export declare class AssetManager {
    private assetCache;
    loadBundle(assets: Record<string, string>): Promise<any>;
    unloadBundle(assets: Record<string, string>): Promise<void>;
    private loadAsset;
    private unloadAsset;
}
